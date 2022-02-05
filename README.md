# Subasta

This repository contains a Solidity auction contract hooked up to Hardhat for testing and Typechain for Typescript types.

## Vickrey Auction
VickreyAuction.sol implements a second-price sealed bid auction, known as a Vickrey Auction.

An auction is initiated when the auction contract receives an ERC721 token via `safeTransferFrom` which notifies the contract via the `IERC721Receiver` interface callback.

The following struct is ABI-encoded and passed as `data` in in the call to `safeTransferFrom`:

```solidity
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
```

This defines the parameters of the auction.

The auction proceeds in two phases:

1. During the bid period sealed bids are accepted in the form of hashed commitments to a bid amount (including a nonce to make them blinded).

2. During the reveal period bidders from phase bidders reveal the amounts by providing the bid amount and nonce whereby the commitment hash is calculated on chain.

During the reveal phase all bidders from the bid phase must reveal or else the auction is default. In the case of default non-revealing bidders have their deposits confiscated and these amounts are redistributed to the good-faith bidders who revealed in the time period and the original token owner.

The progress and results of the auction are indicated by events, in particular when the last bidder reveals the winner of the auction is contained provided by:

```solidity
event VickreyAuctionComplete(
    IERC721 tokenContract,
    uint256 tokenId,
    bool defaulted,
    address winningBidder,
    uint256 winningAmount
);
```

## Tests

To run the tests execute:

```
yarn install
yarn test
```