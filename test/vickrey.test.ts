import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { randomBytes } from 'crypto';
import { BigNumber, ContractTransaction, Signer } from 'ethers';
import { defaultAbiCoder } from 'ethers/lib/utils';
import expect from 'expect';
import { ethers } from 'hardhat';
import { TestERC721, VickreyAuction } from '../typechain-types';
import { CommitmentStruct } from '../typechain-types/VickreyAuction';

describe('VickreyAuction', function () {
  const deposit = 8;
  let tokenOwner: SignerWithAddress;
  let tokenId: BigNumber;
  let initialBalance: BigNumber;
  let bidder1: SignerWithAddress;
  let bidder2: SignerWithAddress;
  let bidder3: SignerWithAddress;
  let bidder4: SignerWithAddress;
  let auction: VickreyAuction;
  let erc721: TestERC721;

  before(async function () {
    [tokenOwner, bidder1, bidder2, bidder3, bidder4] = await ethers.getSigners();
    const auctionFactory = await ethers.getContractFactory('VickreyAuction');
    auction = (await auctionFactory.deploy()) as VickreyAuction;
    await auction.deployed();

    const erc721Factory = await ethers.getContractFactory('TestERC721', tokenOwner);
    erc721 = (await erc721Factory.deploy('https://token.io/foo')) as TestERC721;
    await erc721.deployed();

    tokenId = BigNumber.from(42);
    await erc721.mint(tokenOwner.address, tokenId, Buffer.from('{ "foo": "bar" }'));

    initialBalance = await bidder1.getBalance();
    expect(initialBalance).toEqual(await bidder2.getBalance());
    expect(initialBalance).toEqual(await bidder3.getBalance());
    expect(initialBalance).toEqual(await bidder4.getBalance());
  });

  it('Can run auction (happy path)', async function () {
    const bidPeriodSeconds = 4;
    const revealPeriodSeconds = 100;
    const config = await auction.encodeConfig({
      bidPeriodSeconds,
      revealPeriodSeconds,
      deposit,
      reserve: 1,
    });

    await erc721['safeTransferFrom(address,address,uint256,bytes)'](
      tokenOwner.address,
      auction.address,
      tokenId,
      config,
    );

    // Commit
    const [com1, com2, com3, com4] = commitments(2, 4, 8, 16);

    // Bid
    const bidTxs = await Promise.all([
      bid(bidder1, com1),
      bid(bidder2, com2),
      bid(bidder3, com3),
      bid(bidder4, com4),
      wait(bidPeriodSeconds),
    ]);
    // Track ether paid for gas for winner (bidder4) and non-winner (bidder2)
    let gasPaid2 = await getGasPaid(bidTxs[1]);
    let gasPaid4 = await getGasPaid(bidTxs[3]);

    // Reveal
    const revealTxs = await Promise.all([reveal(bidder2, com2), reveal(bidder3, com3), reveal(bidder4, com4)]);
    gasPaid2 = gasPaid2.add(await getGasPaid(revealTxs[0]));
    gasPaid4 = gasPaid4.add(await getGasPaid(revealTxs[2]));

    // Final bid should close auction
    const tx = await reveal(bidder1, com1);
    const receipt = await tx.wait();
    const completionEvent = receipt.events?.filter((e) => e.event === 'VickreyAuctionComplete')?.[0];
    expect(completionEvent?.args?.winningBidder).toEqual(bidder4.address);
    expect(completionEvent?.args?.winningAmount).toEqual(com3.bidAmount);

    const winnerBalance = await bidder4.getBalance();
    // Ensure deposit correctly refunded and bid subtracted
    expect(winnerBalance.toString()).toEqual(initialBalance.sub(com3.bidAmount).sub(gasPaid4).toString());
    const nonWinnerBalance = await bidder2.getBalance();
    // Non-winner should only pay gas
    expect(nonWinnerBalance.toString()).toEqual(initialBalance.sub(gasPaid2).toString());
    // Check token was transferred
    const newTokenOwner = await erc721.ownerOf(tokenId);
    expect(newTokenOwner).toEqual(bidder4.address);
  });

  async function bid(bidder: Signer, commitment: CommitmentStruct): Promise<ContractTransaction> {
    return auction
      .connect(bidder)
      .placeBid(erc721.address, tokenId, await auction.hashCommitment(commitment), { value: deposit });
  }

  async function reveal(bidder: Signer, commitment: CommitmentStruct): Promise<ContractTransaction> {
    let value = BigNumber.from(commitment.bidAmount).sub(deposit);
    if (value.lt(0)) {
      value = BigNumber.from(0);
    }
    return auction.connect(bidder).revealBid(erc721.address, tokenId, commitment, { value });
  }
});

function commitments(...amounts: number[]): CommitmentStruct[] {
  return amounts.map((a) => ({ bidAmount: BigNumber.from(a), nonce: getNonce() }));
}

function getNonce(): Buffer {
  return randomBytes(32);
}

function wait(seconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

async function getGasPaid(tx: ContractTransaction): Promise<BigNumber> {
  const receipt = await tx.wait();
  return receipt.cumulativeGasUsed.mul(receipt.effectiveGasPrice);
}
