//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * A Vickrey auction is a sealed-bid auction where the highest bidder pays the second-highest bid amount.
 * In this auction bidding your true value is the dominant strategy.
 * The intuition is: raising the winning bidder's bid does not change the price so there is no payoff for under-bidding.
 */
contract VickreyAuction is IERC721Receiver {
    event VickreyAuctionOpen(
        IERC721 tokenContract,
        uint256 tokenId,
        address tokenOwner,
        uint256 bidPeriodSeconds,
        uint256 revealPeriodSeconds,
        uint256 deposit,
        uint256 reserve
    );

    event VickreyAuctionBid(IERC721 tokenContract, uint256 tokenId, address bidder, bytes32 commitmentHash);

    event VickreyAuctionReveal(IERC721 tokenContract, uint256 tokenId, address bidder, uint256 bidAmount);

    event VickreyAuctionComplete(
        IERC721 tokenContract,
        uint256 tokenId,
        bool defaulted,
        address winningBidder,
        uint256 winningAmount
    );

    error InsufficientValue(uint256 required, uint256 paid);

    struct AuctionConfig {
        // Period after ERC721 token is received during which bids must be sent
        uint256 bidPeriodSeconds;
        // Period after close of bid period in seconds during which reveals be sent
        uint256 revealPeriodSeconds;
        // Value that must be transferred with a bid in order for it to be valued - will be returned provided the bidder
        // reveals their bid during the reveal period
        uint256 deposit;
        // Minimum value the seller (transferor of the ERC721 token) will accept for a bid
        uint256 reserve;
    }

    enum AuctionPhase {
        NotOpen,
        Bid,
        Reveal,
        Default
    }

    struct Commitment {
        uint256 bidAmount;
        bytes32 nonce;
    }

    struct Auction {
        address tokenOwner;
        AuctionConfig config;
        // Time
        uint256 began;
        address[] bidders;
        // Bidder to commitment hash
        mapping(address => bytes32) commitmentHashes;
        // Bidder to revealed bid amounts
        mapping(address => uint256) bids;
    }

    // tokenContract => tokenId => auction;
    mapping(IERC721 => mapping(uint256 => Auction)) auctions;

    modifier phaseIs(
        IERC721 tokenContract,
        uint256 tokenId,
        AuctionPhase requiredPhase
    ) {
        AuctionPhase phase = getAuctionPhase(tokenContract, tokenId);
        require(
            phase == requiredPhase,
            string(
                abi.encodePacked("Phase must be ", auctionPhaseName(requiredPhase), " but is ", auctionPhaseName(phase))
            )
        );
        _;
    }

    /**
    * Accept negative amount for refunds
    * 
    * This function takes "base" which is the amount to charge and "less"
    * the amount to refund
    */
    modifier costs(uint256 base, uint256 less) {
        int256 refund = int256(msg.value) - int256(base) + int256(less);
        if (refund < 0) {
            revert InsufficientValue(uint256(int256(base) - int256(less)), msg.value);
        }

        _;
        if (refund > 0) {
            // Refund overpayment
            payable(msg.sender).transfer(uint256(refund));
        }
    }

    function placeBid(
        IERC721 tokenContract,
        uint256 tokenId,
        bytes32 commitmentHash
    )
        external
        payable
        phaseIs(tokenContract, tokenId, AuctionPhase.Bid)
        costs(auctions[tokenContract][tokenId].config.deposit, 0)
    {
        require(auctions[tokenContract][tokenId].commitmentHashes[msg.sender] == "", "bid is already placed");

        auctions[tokenContract][tokenId].bidders.push(msg.sender);
        auctions[tokenContract][tokenId].commitmentHashes[msg.sender] = commitmentHash;
    }

    function revealBid(
        IERC721 tokenContract,
        uint256 tokenId,
        Commitment calldata commitment
    )
        external
        payable
        phaseIs(tokenContract, tokenId, AuctionPhase.Reveal)
        costs(commitment.bidAmount, auctions[tokenContract][tokenId].config.deposit)
        returns (AuctionPhase)
    {
        require(
            commitment.bidAmount >= auctions[tokenContract][tokenId].config.reserve,
            "Bid amount does not meet reserve"
        );
        bytes32 committedHash = auctions[tokenContract][tokenId].commitmentHashes[msg.sender];
        bytes32 commitmentHash = this.hashCommitment(commitment);
        require(committedHash == commitmentHash, "Revealed commitment hash does not match committed hash");
        auctions[tokenContract][tokenId].bids[msg.sender] = commitment.bidAmount;
        emit VickreyAuctionReveal(tokenContract, tokenId, msg.sender, commitment.bidAmount);
        // Attempt close
        return close(tokenContract, tokenId);
    }

    // An auction will end when last bidder reveals automatically within the reveal period or if they reveal to late
    // but in the case non-revealers the auction must be ended forcibly which can be done by anyone provided the auction
    // is the Default phase
    function endAuction(IERC721 tokenContract, uint256 tokenId)
        external
        phaseIs(tokenContract, tokenId, AuctionPhase.Default)
    {
        AuctionPhase phase = close(tokenContract, tokenId);
        // Sanity check: if phaseIs modifier does not revert nor should this
        require(phase == AuctionPhase.NotOpen, "Auction could not be closed");
    }

    // If reveal period has lapsed then
    function close(IERC721 tokenContract, uint256 tokenId) internal returns (AuctionPhase) {
        AuctionPhase phase = getAuctionPhase(tokenContract, tokenId);
        if (phase == AuctionPhase.NotOpen || phase == AuctionPhase.Bid) {
            // Not ready to close yet
            return phase;
        }
        (address winningBidder, uint256 secondHighestBid, uint256 unrevealed) = countBids(tokenContract, tokenId);
        if (phase == AuctionPhase.Reveal) {
            // If auction is complete
            if (unrevealed == 0) {
                disburse(tokenContract, tokenId, winningBidder, secondHighestBid, unrevealed);
                // Pay owner winning bid
                payable(auctions[tokenContract][tokenId].tokenOwner).transfer(secondHighestBid);
                // Transfer token
                tokenContract.safeTransferFrom(address(this), winningBidder, tokenId);
                emit VickreyAuctionComplete(tokenContract, tokenId, false, winningBidder, secondHighestBid);
                return resetAuction(tokenContract, tokenId);
            }
        } else if (phase == AuctionPhase.Default) {
            disburse(tokenContract, tokenId, address(0), 0, unrevealed);
            // Return token back to owner
            tokenContract.safeTransferFrom(address(this), auctions[tokenContract][tokenId].tokenOwner, tokenId);
            emit VickreyAuctionComplete(tokenContract, tokenId, true, address(0), 0);
            return resetAuction(tokenContract, tokenId);
        }
        return phase;
    }

    function countBids(IERC721 tokenContract, uint256 tokenId)
        internal
        view
        returns (
            address winningBidder,
            uint256 secondHighestBid,
            uint256 unrevealed
        )
    {
        address[] storage bidders = auctions[tokenContract][tokenId].bidders;
        Auction storage auction = auctions[tokenContract][tokenId];
        uint256 firstHighestBid = 0;
        for (uint i = 0; i < bidders.length; i++) {
            address bidder = bidders[i];
            uint256 bid = auction.bids[bidder];
            if (bid == 0) {
                unrevealed++;
            } else if (bid > firstHighestBid) {
                winningBidder = bidder;

                secondHighestBid = firstHighestBid;
                firstHighestBid = bid;

                if(secondHighestBid == 0) {
                    secondHighestBid = firstHighestBid;
                }
            }   
        }
    }

    function disburse(
        IERC721 tokenContract,
        uint256 tokenId,
        address winningBidder,
        uint256 secondHighestBid,
        uint256 unrevealed
    ) internal {
        // goodActors are bidders who revealed and the tokenOwner
        uint256 goodActors = auctions[tokenContract][tokenId].bidders.length - unrevealed + 1;
        // Calculate compensation per actor
        uint256 totalComp = auctions[tokenContract][tokenId].config.deposit * unrevealed;
        uint256 comp = totalComp / goodActors;
        uint256 compRem = totalComp % goodActors;
        // refund deposits
        // pay original owner
        for (uint256 i = 0; i < auctions[tokenContract][tokenId].bidders.length; i++) {
            address bidder = auctions[tokenContract][tokenId].bidders[i];
            uint256 bid = auctions[tokenContract][tokenId].bids[bidder];
            // Will be 0x0 for Default
            if (bidder == winningBidder) {
                // Refund difference between highestBid and secondHighestBid
                payable(bidder).transfer(bid - secondHighestBid);
            } else if (bid != 0) {
                // Refund bids (note the deposit has already be netted off)
                payable(bidder).transfer(bid + comp);
            }
        }
        // Distribute any remainder of comp to tokenOwner
        payable(auctions[tokenContract][tokenId].tokenOwner).transfer(comp + compRem);
    }

    function resetAuction(IERC721 tokenContract, uint256 tokenId) internal returns (AuctionPhase) {
        for (uint256 i = 0; i < auctions[tokenContract][tokenId].bidders.length; i++) {
            address bidder = auctions[tokenContract][tokenId].bidders[i];
            // Clear commitments and bids
            delete auctions[tokenContract][tokenId].commitmentHashes[bidder];
            delete auctions[tokenContract][tokenId].bids[bidder];
        }
        // Reset auction for tokenId (commitments and bids cleared above)
        auctions[tokenContract][tokenId].began = 0;
        delete auctions[tokenContract][tokenId].bidders;
        return AuctionPhase.NotOpen;
    }

    function getAuctionPhase(IERC721 tokenContract, uint256 tokenId) public view returns (AuctionPhase) {
        uint256 bound = auctions[tokenContract][tokenId].began;
        if (bound == 0) {
            return AuctionPhase.NotOpen;
        }
        bound += auctions[tokenContract][tokenId].config.bidPeriodSeconds;
        if (block.timestamp <= bound) {
            return AuctionPhase.Bid;
        }
        bound += auctions[tokenContract][tokenId].config.revealPeriodSeconds;
        if (block.timestamp <= bound) {
            return AuctionPhase.Reveal;
        }
        return AuctionPhase.Default;
    }

    function auctionPhaseName(AuctionPhase phase) internal pure returns (string memory) {
        if (phase == AuctionPhase.NotOpen) {
            return "Not Open";
        }
        if (phase == AuctionPhase.Bid) {
            return "Bid";
        }
        if (phase == AuctionPhase.Reveal) {
            return "Reveal";
        }
        return "Default";
    }

    // Start an auction when safeTransferFrom'd an ERC721 token
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external override returns (bytes4) {
        (uint256 bidPeriodSeconds, uint256 revealPeriodSeconds, uint256 deposit, uint256 reserve) = abi.decode(
            data,
            (uint256, uint256, uint256, uint256)
        );
        IERC721 tokenContract = IERC721(msg.sender);
        auctions[tokenContract][tokenId].began = block.timestamp;
        auctions[tokenContract][tokenId].tokenOwner = from;
        auctions[tokenContract][tokenId].config.bidPeriodSeconds = bidPeriodSeconds;
        auctions[tokenContract][tokenId].config.revealPeriodSeconds = revealPeriodSeconds;
        auctions[tokenContract][tokenId].config.deposit = deposit;
        auctions[tokenContract][tokenId].config.reserve = reserve;
        emit VickreyAuctionOpen(tokenContract, tokenId, from, bidPeriodSeconds, revealPeriodSeconds, deposit, reserve);
        return IERC721Receiver.onERC721Received.selector;
    }

    // Serialisation utilities

    function encodeConfig(AuctionConfig calldata config) external pure returns (bytes memory) {
        return abi.encode(config);
    }

    function hashCommitment(Commitment calldata commitment) external pure returns (bytes32) {
        return keccak256(abi.encode(commitment.bidAmount, commitment.nonce));
    }
}
