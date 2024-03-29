/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { EventFragment, FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { OnEvent, TypedEvent, TypedEventFilter, TypedListener } from "./common";

export type AuctionConfigStruct = {
  bidPeriodSeconds: BigNumberish;
  revealPeriodSeconds: BigNumberish;
  deposit: BigNumberish;
  reserve: BigNumberish;
};

export type AuctionConfigStructOutput = [
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber
] & {
  bidPeriodSeconds: BigNumber;
  revealPeriodSeconds: BigNumber;
  deposit: BigNumber;
  reserve: BigNumber;
};

export type CommitmentStruct = { bidAmount: BigNumberish; nonce: BytesLike };

export type CommitmentStructOutput = [BigNumber, string] & {
  bidAmount: BigNumber;
  nonce: string;
};

export interface VickreyAuctionInterface extends utils.Interface {
  functions: {
    "encodeConfig((uint256,uint256,uint256,uint256))": FunctionFragment;
    "endAuction(address,uint256)": FunctionFragment;
    "getAuctionPhase(address,uint256)": FunctionFragment;
    "hashCommitment((uint256,bytes32))": FunctionFragment;
    "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
    "placeBid(address,uint256,bytes32)": FunctionFragment;
    "revealBid(address,uint256,(uint256,bytes32))": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "encodeConfig",
    values: [AuctionConfigStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "endAuction",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getAuctionPhase",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "hashCommitment",
    values: [CommitmentStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC721Received",
    values: [string, string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "placeBid",
    values: [string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "revealBid",
    values: [string, BigNumberish, CommitmentStruct]
  ): string;

  decodeFunctionResult(
    functionFragment: "encodeConfig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "endAuction", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getAuctionPhase",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "hashCommitment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC721Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "placeBid", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "revealBid", data: BytesLike): Result;

  events: {
    "VickreyAuctionBid(address,uint256,address,bytes32)": EventFragment;
    "VickreyAuctionComplete(address,uint256,bool,address,uint256)": EventFragment;
    "VickreyAuctionOpen(address,uint256,address,uint256,uint256,uint256,uint256)": EventFragment;
    "VickreyAuctionReveal(address,uint256,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "VickreyAuctionBid"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "VickreyAuctionComplete"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "VickreyAuctionOpen"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "VickreyAuctionReveal"): EventFragment;
}

export type VickreyAuctionBidEvent = TypedEvent<
  [string, BigNumber, string, string],
  {
    tokenContract: string;
    tokenId: BigNumber;
    bidder: string;
    commitmentHash: string;
  }
>;

export type VickreyAuctionBidEventFilter =
  TypedEventFilter<VickreyAuctionBidEvent>;

export type VickreyAuctionCompleteEvent = TypedEvent<
  [string, BigNumber, boolean, string, BigNumber],
  {
    tokenContract: string;
    tokenId: BigNumber;
    defaulted: boolean;
    winningBidder: string;
    winningAmount: BigNumber;
  }
>;

export type VickreyAuctionCompleteEventFilter =
  TypedEventFilter<VickreyAuctionCompleteEvent>;

export type VickreyAuctionOpenEvent = TypedEvent<
  [string, BigNumber, string, BigNumber, BigNumber, BigNumber, BigNumber],
  {
    tokenContract: string;
    tokenId: BigNumber;
    tokenOwner: string;
    bidPeriodSeconds: BigNumber;
    revealPeriodSeconds: BigNumber;
    deposit: BigNumber;
    reserve: BigNumber;
  }
>;

export type VickreyAuctionOpenEventFilter =
  TypedEventFilter<VickreyAuctionOpenEvent>;

export type VickreyAuctionRevealEvent = TypedEvent<
  [string, BigNumber, string, BigNumber],
  {
    tokenContract: string;
    tokenId: BigNumber;
    bidder: string;
    bidAmount: BigNumber;
  }
>;

export type VickreyAuctionRevealEventFilter =
  TypedEventFilter<VickreyAuctionRevealEvent>;

export interface VickreyAuction extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: VickreyAuctionInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    encodeConfig(
      config: AuctionConfigStruct,
      overrides?: CallOverrides
    ): Promise<[string]>;

    endAuction(
      tokenContract: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getAuctionPhase(
      tokenContract: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[number]>;

    hashCommitment(
      commitment: CommitmentStruct,
      overrides?: CallOverrides
    ): Promise<[string]>;

    onERC721Received(
      operator: string,
      from: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    placeBid(
      tokenContract: string,
      tokenId: BigNumberish,
      commitmentHash: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    revealBid(
      tokenContract: string,
      tokenId: BigNumberish,
      commitment: CommitmentStruct,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  encodeConfig(
    config: AuctionConfigStruct,
    overrides?: CallOverrides
  ): Promise<string>;

  endAuction(
    tokenContract: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getAuctionPhase(
    tokenContract: string,
    tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<number>;

  hashCommitment(
    commitment: CommitmentStruct,
    overrides?: CallOverrides
  ): Promise<string>;

  onERC721Received(
    operator: string,
    from: string,
    tokenId: BigNumberish,
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  placeBid(
    tokenContract: string,
    tokenId: BigNumberish,
    commitmentHash: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  revealBid(
    tokenContract: string,
    tokenId: BigNumberish,
    commitment: CommitmentStruct,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    encodeConfig(
      config: AuctionConfigStruct,
      overrides?: CallOverrides
    ): Promise<string>;

    endAuction(
      tokenContract: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getAuctionPhase(
      tokenContract: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<number>;

    hashCommitment(
      commitment: CommitmentStruct,
      overrides?: CallOverrides
    ): Promise<string>;

    onERC721Received(
      operator: string,
      from: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    placeBid(
      tokenContract: string,
      tokenId: BigNumberish,
      commitmentHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    revealBid(
      tokenContract: string,
      tokenId: BigNumberish,
      commitment: CommitmentStruct,
      overrides?: CallOverrides
    ): Promise<number>;
  };

  filters: {
    "VickreyAuctionBid(address,uint256,address,bytes32)"(
      tokenContract?: null,
      tokenId?: null,
      bidder?: null,
      commitmentHash?: null
    ): VickreyAuctionBidEventFilter;
    VickreyAuctionBid(
      tokenContract?: null,
      tokenId?: null,
      bidder?: null,
      commitmentHash?: null
    ): VickreyAuctionBidEventFilter;

    "VickreyAuctionComplete(address,uint256,bool,address,uint256)"(
      tokenContract?: null,
      tokenId?: null,
      defaulted?: null,
      winningBidder?: null,
      winningAmount?: null
    ): VickreyAuctionCompleteEventFilter;
    VickreyAuctionComplete(
      tokenContract?: null,
      tokenId?: null,
      defaulted?: null,
      winningBidder?: null,
      winningAmount?: null
    ): VickreyAuctionCompleteEventFilter;

    "VickreyAuctionOpen(address,uint256,address,uint256,uint256,uint256,uint256)"(
      tokenContract?: null,
      tokenId?: null,
      tokenOwner?: null,
      bidPeriodSeconds?: null,
      revealPeriodSeconds?: null,
      deposit?: null,
      reserve?: null
    ): VickreyAuctionOpenEventFilter;
    VickreyAuctionOpen(
      tokenContract?: null,
      tokenId?: null,
      tokenOwner?: null,
      bidPeriodSeconds?: null,
      revealPeriodSeconds?: null,
      deposit?: null,
      reserve?: null
    ): VickreyAuctionOpenEventFilter;

    "VickreyAuctionReveal(address,uint256,address,uint256)"(
      tokenContract?: null,
      tokenId?: null,
      bidder?: null,
      bidAmount?: null
    ): VickreyAuctionRevealEventFilter;
    VickreyAuctionReveal(
      tokenContract?: null,
      tokenId?: null,
      bidder?: null,
      bidAmount?: null
    ): VickreyAuctionRevealEventFilter;
  };

  estimateGas: {
    encodeConfig(
      config: AuctionConfigStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    endAuction(
      tokenContract: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getAuctionPhase(
      tokenContract: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hashCommitment(
      commitment: CommitmentStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    onERC721Received(
      operator: string,
      from: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    placeBid(
      tokenContract: string,
      tokenId: BigNumberish,
      commitmentHash: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    revealBid(
      tokenContract: string,
      tokenId: BigNumberish,
      commitment: CommitmentStruct,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    encodeConfig(
      config: AuctionConfigStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    endAuction(
      tokenContract: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getAuctionPhase(
      tokenContract: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    hashCommitment(
      commitment: CommitmentStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    onERC721Received(
      operator: string,
      from: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    placeBid(
      tokenContract: string,
      tokenId: BigNumberish,
      commitmentHash: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    revealBid(
      tokenContract: string,
      tokenId: BigNumberish,
      commitment: CommitmentStruct,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
