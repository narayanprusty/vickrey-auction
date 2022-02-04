/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides, Signer, utils } from "ethers";
import type {
  VickreyAuction,
  VickreyAuctionInterface,
} from "../VickreyAuction";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "required",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "paid",
        type: "uint256",
      },
    ],
    name: "InsufficientValue",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract IERC721",
        name: "tokenContract",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "bidder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "commitmentHash",
        type: "bytes32",
      },
    ],
    name: "VickreyAuctionBid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract IERC721",
        name: "tokenContract",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "defaulted",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "address",
        name: "winningBidder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "winningAmount",
        type: "uint256",
      },
    ],
    name: "VickreyAuctionComplete",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract IERC721",
        name: "tokenContract",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "tokenOwner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bidPeriodSeconds",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "revealPeriodSeconds",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "deposit",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "reserve",
        type: "uint256",
      },
    ],
    name: "VickreyAuctionOpen",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract IERC721",
        name: "tokenContract",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "bidder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bidAmount",
        type: "uint256",
      },
    ],
    name: "VickreyAuctionReveal",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "bidPeriodSeconds",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "revealPeriodSeconds",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deposit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "reserve",
            type: "uint256",
          },
        ],
        internalType: "struct VickreyAuction.AuctionConfig",
        name: "config",
        type: "tuple",
      },
    ],
    name: "encodeConfig",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC721",
        name: "tokenContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "endAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC721",
        name: "tokenContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getAuctionPhase",
    outputs: [
      {
        internalType: "enum VickreyAuction.AuctionPhase",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "bidAmount",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "nonce",
            type: "bytes32",
          },
        ],
        internalType: "struct VickreyAuction.Commitment",
        name: "commitment",
        type: "tuple",
      },
    ],
    name: "hashCommitment",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC721",
        name: "tokenContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "commitmentHash",
        type: "bytes32",
      },
    ],
    name: "placeBid",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC721",
        name: "tokenContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "bidAmount",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "nonce",
            type: "bytes32",
          },
        ],
        internalType: "struct VickreyAuction.Commitment",
        name: "commitment",
        type: "tuple",
      },
    ],
    name: "revealBid",
    outputs: [
      {
        internalType: "enum VickreyAuction.AuctionPhase",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061325b806100206000396000f3fe6080604052600436106100705760003560e01c806388cedbc41161004e57806388cedbc41461010b578063a82ff48214610134578063f96aa21714610164578063fb859d60146101a157610070565b80630363179814610075578063150b7a02146100b25780638333437c146100ef575b600080fd5b34801561008157600080fd5b5061009c600480360381019061009791906124f8565b6101de565b6040516100a991906128b4565b60405180910390f35b3480156100be57600080fd5b506100d960048036038101906100d4919061234c565b610218565b6040516100e691906128cf565b60405180910390f35b61010960048036038101906101049190612431565b6104e7565b005b34801561011757600080fd5b50610132600480360381019061012d91906123f5565b61091b565b005b61014e60048036038101906101499190612480565b610ade565b60405161015b9190612a66565b60405180910390f35b34801561017057600080fd5b5061018b600480360381019061018691906123f5565b610fe7565b6040516101989190612a66565b60405180910390f35b3480156101ad57600080fd5b506101c860048036038101906101c391906124cf565b611146565b6040516101d591906128ea565b60405180910390f35b6000816000013582602001356040516020016101fb929190612b59565b604051602081830303815290604052805190602001209050919050565b6000806000806000868681019061022f9190612521565b93509350935093506000339050426000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008b815260200190815260200160002060050181905550896000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008b815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550846000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008b815260200190815260200160002060010160000181905550836000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008b815260200190815260200160002060010160010181905550826000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008b815260200190815260200160002060010160020181905550816000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008b8152602001908152602001600020600101600301819055507f03c605011371d1667b609cd37b14973a4453299c5b9022b003a8d7fba6511684818a8c888888886040516104c79796959493929190612951565b60405180910390a163150b7a0260e01b9550505050505095945050505050565b8282600160006104f78484610fe7565b9050816003811115610532577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b81600381111561056b577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b146105758361116f565b61057e8361116f565b60405160200161058f929190612843565b604051602081830303815290604052906105df576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105d69190612a81565b60405180910390fd5b506000808873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000878152602001908152602001600020600101600201546000808183346106469190612d91565b6106509190612c1c565b905060008112156106a55781836106679190612d91565b346040517f7040b58c00000000000000000000000000000000000000000000000000000000815260040161069c929190612b82565b60405180910390fd5b60008060008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008b815260200190815260200160002060070160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414610777576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161076e90612ac3565b60405180910390fd5b6000808b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008a8152602001908152602001600020600601339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550876000808c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008b815260200190815260200160002060070160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600081131561090f573373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015801561090d573d6000803e3d6000fd5b505b50505050505050505050565b81816003600061092b8484610fe7565b9050816003811115610966577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b81600381111561099f577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b146109a98361116f565b6109b28361116f565b6040516020016109c3929190612843565b60405160208183030381529060405290610a13576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a0a9190612a81565b60405180910390fd5b506000610a2087876113d1565b905060006003811115610a5c577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b816003811115610a95577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b14610ad5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610acc90612aa3565b60405180910390fd5b50505050505050565b6000838360026000610af08484610fe7565b9050816003811115610b2b577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b816003811115610b64577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b14610b6e8361116f565b610b778361116f565b604051602001610b88929190612843565b60405160208183030381529060405290610bd8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bcf9190612a81565b60405180910390fd5b5085600001356000808a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000898152602001908152602001600020600101600201546000818334610c439190612d91565b610c4d9190612c1c565b90506000811215610ca2578183610c649190612d91565b346040517f7040b58c000000000000000000000000000000000000000000000000000000008152600401610c99929190612b82565b60405180910390fd5b6000808c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008b81526020019081526020016000206001016003015489600001351015610d3e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d3590612b03565b60405180910390fd5b60008060008d73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008c815260200190815260200160002060070160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905060003073ffffffffffffffffffffffffffffffffffffffff1663036317988c6040518263ffffffff1660e01b8152600401610e0d9190612b3e565b60206040518083038186803b158015610e2557600080fd5b505afa158015610e39573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e5d91906123cc565b9050808214610ea1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e9890612ae3565b60405180910390fd5b8a600001356000808f73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008e815260200190815260200160002060080160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055507ff9be66f6a76cfb8f85c2b0a07b6d3959d0069913929aad35a3ba90c29273c4eb8d8d338e60000135604051610f72949392919061290c565b60405180910390a1610f848d8d6113d1565b995050506000811315610fd9573373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610fd7573d6000803e3d6000fd5b505b505050505050509392505050565b6000806000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008481526020019081526020016000206005015490506000811415611052576000915050611140565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002060010160000154816110b39190612cb0565b90508042116110c6576001915050611140565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002060010160010154816111279190612cb0565b905080421161113a576002915050611140565b60039150505b92915050565b6060816040516020016111599190612b23565b6040516020818303038152906040529050919050565b6060600060038111156111ab577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8260038111156111e4577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b1415611227576040518060400160405280600881526020017f4e6f74204f70656e00000000000000000000000000000000000000000000000081525090506113cc565b60016003811115611261577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b82600381111561129a577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b14156112dd576040518060400160405280600381526020017f426964000000000000000000000000000000000000000000000000000000000081525090506113cc565b60026003811115611317577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b826003811115611350577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b1415611393576040518060400160405280600681526020017f52657665616c000000000000000000000000000000000000000000000000000081525090506113cc565b6040518060400160405280600781526020017f44656661756c740000000000000000000000000000000000000000000000000081525090505b919050565b6000806113de8484610fe7565b90506000600381111561141a577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b816003811115611453577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b14806114cf575060016003811115611494577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8160038111156114cd577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b145b156114dd57809150506118c9565b60008060006114ec87876118cf565b9250925092506002600381111561152c577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b846003811115611565577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b14156117035760008114156116fe576115818787858585611a9d565b6000808873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600087815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051600060405180830381858888f19350505050158015611639573d6000803e3d6000fd5b508673ffffffffffffffffffffffffffffffffffffffff166342842e0e3085896040518463ffffffff1660e01b81526004016116779392919061287d565b600060405180830381600087803b15801561169157600080fd5b505af11580156116a5573d6000803e3d6000fd5b505050507fb5417bd14ca32fa890c23e91907a2969fb7394fad79c5b47b05c57a6bb35a3eb8787600086866040516116e1959493929190612a13565b60405180910390a16116f38787611f0c565b9450505050506118c9565b6118c1565b60038081111561173c577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b846003811115611775577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b14156118c057611789878760008085611a9d565b8673ffffffffffffffffffffffffffffffffffffffff166342842e0e306000808b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008a815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16896040518463ffffffff1660e01b81526004016118389392919061287d565b600060405180830381600087803b15801561185257600080fd5b505af1158015611866573d6000803e3d6000fd5b505050507fb5417bd14ca32fa890c23e91907a2969fb7394fad79c5b47b05c57a6bb35a3eb878760016000806040516118a39594939291906129c0565b60405180910390a16118b58787611f0c565b9450505050506118c9565b5b839450505050505b92915050565b6000806000806000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000868152602001908152602001600020600601905060008060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600087815260200190815260200160002090506000805b8380549050811015611a925760008482815481106119c7577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060008460080160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490506000811415611a5d57846001016002015487611a569190612cb0565b9650611a7d565b83811115611a7c578198508397508093506000881415611a7b578397505b5b5b50508080611a8a90612f81565b915050611980565b505050509250925092565b60006001826000808973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600088815260200190815260200160002060060180549050611b029190612e25565b611b0c9190612cb0565b90506000826000808973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600088815260200190815260200160002060010160020154611b719190612d37565b905060008282611b819190612d06565b905060008383611b919190612fca565b905060005b6000808b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008a815260200190815260200160002060060180549050811015611e3c5760008060008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008b81526020019081526020016000206006018281548110611c7f577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060008060008d73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008c815260200190815260200160002060080160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508973ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611dcb578173ffffffffffffffffffffffffffffffffffffffff166108fc8a83611d9a9190612e25565b9081150290604051600060405180830381858888f19350505050158015611dc5573d6000803e3d6000fd5b50611e27565b60008114611e26578173ffffffffffffffffffffffffffffffffffffffff166108fc8683611df99190612cb0565b9081150290604051600060405180830381858888f19350505050158015611e24573d6000803e3d6000fd5b505b5b50508080611e3490612f81565b915050611b96565b506000808a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600089815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc8284611ed59190612cb0565b9081150290604051600060405180830381858888f19350505050158015611f00573d6000803e3d6000fd5b50505050505050505050565b600080600090505b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000848152602001908152602001600020600601805490508110156121645760008060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008581526020019081526020016000206006018281548110611ffd577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690506000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002060070160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600090556000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002060080160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000905550808061215c90612f81565b915050611f14565b5060008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000848152602001908152602001600020600501819055506000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000838152602001908152602001600020600601600061221b9190612225565b6000905092915050565b50805460008255906000526020600020908101906122439190612246565b50565b5b8082111561225f576000816000905550600101612247565b5090565b600081359050612272816131c9565b92915050565b600081359050612287816131e0565b92915050565b60008151905061229c816131e0565b92915050565b60008083601f8401126122b457600080fd5b8235905067ffffffffffffffff8111156122cd57600080fd5b6020830191508360018202830111156122e557600080fd5b9250929050565b6000813590506122fb816131f7565b92915050565b60006080828403121561231357600080fd5b81905092915050565b60006040828403121561232e57600080fd5b81905092915050565b6000813590506123468161320e565b92915050565b60008060008060006080868803121561236457600080fd5b600061237288828901612263565b955050602061238388828901612263565b945050604061239488828901612337565b935050606086013567ffffffffffffffff8111156123b157600080fd5b6123bd888289016122a2565b92509250509295509295909350565b6000602082840312156123de57600080fd5b60006123ec8482850161228d565b91505092915050565b6000806040838503121561240857600080fd5b6000612416858286016122ec565b925050602061242785828601612337565b9150509250929050565b60008060006060848603121561244657600080fd5b6000612454868287016122ec565b935050602061246586828701612337565b925050604061247686828701612278565b9150509250925092565b60008060006080848603121561249557600080fd5b60006124a3868287016122ec565b93505060206124b486828701612337565b92505060406124c58682870161231c565b9150509250925092565b6000608082840312156124e157600080fd5b60006124ef84828501612301565b91505092915050565b60006040828403121561250a57600080fd5b60006125188482850161231c565b91505092915050565b6000806000806080858703121561253757600080fd5b600061254587828801612337565b945050602061255687828801612337565b935050604061256787828801612337565b925050606061257887828801612337565b91505092959194509250565b61258d81612e59565b82525050565b61259c81612e6b565b82525050565b6125ab81612e77565b82525050565b6125ba81612e77565b82525050565b6125c981612e81565b82525050565b60006125da82612bab565b6125e48185612bc1565b93506125f4818560208601612f4e565b6125fd81613088565b840191505092915050565b61261181612f06565b82525050565b61262081612f2a565b82525050565b61262f81612f3c565b82525050565b600061264082612bb6565b61264a8185612bd2565b935061265a818560208601612f4e565b61266381613088565b840191505092915050565b600061267982612bb6565b6126838185612be3565b9350612693818560208601612f4e565b80840191505092915050565b60006126ac600e83612be3565b91506126b782613099565b600e82019050919050565b60006126cf601b83612bd2565b91506126da826130c2565b602082019050919050565b60006126f2601583612bd2565b91506126fd826130eb565b602082019050919050565b6000612715603683612bd2565b915061272082613114565b604082019050919050565b6000612738600883612be3565b915061274382613163565b600882019050919050565b600061275b602083612bd2565b91506127668261318c565b602082019050919050565b608082016127826000830183612c05565b61278f6000850182612825565b5061279d6020830183612c05565b6127aa6020850182612825565b506127b86040830183612c05565b6127c56040850182612825565b506127d36060830183612c05565b6127e06060850182612825565b50505050565b604082016127f76000830183612c05565b6128046000850182612825565b506128126020830183612bee565b61281f60208501826125a2565b50505050565b61282e81612efc565b82525050565b61283d81612efc565b82525050565b600061284e8261269f565b915061285a828561266e565b91506128658261272b565b9150612871828461266e565b91508190509392505050565b60006060820190506128926000830186612584565b61289f6020830185612584565b6128ac6040830184612834565b949350505050565b60006020820190506128c960008301846125b1565b92915050565b60006020820190506128e460008301846125c0565b92915050565b6000602082019050818103600083015261290481846125cf565b905092915050565b60006080820190506129216000830187612608565b61292e6020830186612834565b61293b6040830185612584565b6129486060830184612834565b95945050505050565b600060e082019050612966600083018a612608565b6129736020830189612834565b6129806040830188612584565b61298d6060830187612834565b61299a6080830186612834565b6129a760a0830185612834565b6129b460c0830184612834565b98975050505050505050565b600060a0820190506129d56000830188612608565b6129e26020830187612834565b6129ef6040830186612593565b6129fc6060830185612584565b612a096080830184612626565b9695505050505050565b600060a082019050612a286000830188612608565b612a356020830187612834565b612a426040830186612593565b612a4f6060830185612584565b612a5c6080830184612834565b9695505050505050565b6000602082019050612a7b6000830184612617565b92915050565b60006020820190508181036000830152612a9b8184612635565b905092915050565b60006020820190508181036000830152612abc816126c2565b9050919050565b60006020820190508181036000830152612adc816126e5565b9050919050565b60006020820190508181036000830152612afc81612708565b9050919050565b60006020820190508181036000830152612b1c8161274e565b9050919050565b6000608082019050612b386000830184612771565b92915050565b6000604082019050612b5360008301846127e6565b92915050565b6000604082019050612b6e6000830185612834565b612b7b60208301846125b1565b9392505050565b6000604082019050612b976000830185612834565b612ba46020830184612834565b9392505050565b600081519050919050565b600081519050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b6000612bfd6020840184612278565b905092915050565b6000612c146020840184612337565b905092915050565b6000612c2782612ed2565b9150612c3283612ed2565b9250817f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03831360008312151615612c6d57612c6c612ffb565b5b817f8000000000000000000000000000000000000000000000000000000000000000038312600083121615612ca557612ca4612ffb565b5b828201905092915050565b6000612cbb82612efc565b9150612cc683612efc565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115612cfb57612cfa612ffb565b5b828201905092915050565b6000612d1182612efc565b9150612d1c83612efc565b925082612d2c57612d2b61302a565b5b828204905092915050565b6000612d4282612efc565b9150612d4d83612efc565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615612d8657612d85612ffb565b5b828202905092915050565b6000612d9c82612ed2565b9150612da783612ed2565b9250827f800000000000000000000000000000000000000000000000000000000000000001821260008412151615612de257612de1612ffb565b5b827f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff018213600084121615612e1a57612e19612ffb565b5b828203905092915050565b6000612e3082612efc565b9150612e3b83612efc565b925082821015612e4e57612e4d612ffb565b5b828203905092915050565b6000612e6482612edc565b9050919050565b60008115159050919050565b6000819050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b6000612eb882612e59565b9050919050565b6000819050612ecd826131b5565b919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6000612f1182612f18565b9050919050565b6000612f2382612edc565b9050919050565b6000612f3582612ebf565b9050919050565b6000612f4782612efc565b9050919050565b60005b83811015612f6c578082015181840152602081019050612f51565b83811115612f7b576000848401525b50505050565b6000612f8c82612efc565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415612fbf57612fbe612ffb565b5b600182019050919050565b6000612fd582612efc565b9150612fe083612efc565b925082612ff057612fef61302a565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6000601f19601f8301169050919050565b7f5068617365206d75737420626520000000000000000000000000000000000000600082015250565b7f41756374696f6e20636f756c64206e6f7420626520636c6f7365640000000000600082015250565b7f62696420697320616c726561647920706c616365640000000000000000000000600082015250565b7f52657665616c656420636f6d6d69746d656e74206861736820646f6573206e6f60008201527f74206d6174636820636f6d6d6974746564206861736800000000000000000000602082015250565b7f2062757420697320000000000000000000000000000000000000000000000000600082015250565b7f42696420616d6f756e7420646f6573206e6f74206d6565742072657365727665600082015250565b600481106131c6576131c5613059565b5b50565b6131d281612e59565b81146131dd57600080fd5b50565b6131e981612e77565b81146131f457600080fd5b50565b61320081612ead565b811461320b57600080fd5b50565b61321781612efc565b811461322257600080fd5b5056fea2646970667358221220911de4e394b5b361d9766f26a4fa71784c7674a67ccc0745deadd8dc915efab864736f6c63430008040033";

type VickreyAuctionConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: VickreyAuctionConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class VickreyAuction__factory extends ContractFactory {
  constructor(...args: VickreyAuctionConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<VickreyAuction> {
    return super.deploy(overrides || {}) as Promise<VickreyAuction>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): VickreyAuction {
    return super.attach(address) as VickreyAuction;
  }
  connect(signer: Signer): VickreyAuction__factory {
    return super.connect(signer) as VickreyAuction__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VickreyAuctionInterface {
    return new utils.Interface(_abi) as VickreyAuctionInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): VickreyAuction {
    return new Contract(address, _abi, signerOrProvider) as VickreyAuction;
  }
}
