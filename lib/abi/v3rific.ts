import type { Abi } from "viem";

export const v3rificAbi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "cid",
        type: "string",
      },
      {
        internalType: "string",
        name: "unitshash",
        type: "string",
      },
      {
        internalType: "bool",
        name: "claimEnabled",
        type: "bool",
      },
    ],
    name: "mintProduct",
    outputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "platformFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "unitshash",
        type: "string",
      },
    ],
    name: "getByUnitshash",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "cid",
            type: "string",
          },
          {
            internalType: "string",
            name: "unitshash",
            type: "string",
          },
          {
            internalType: "address",
            name: "producer",
            type: "address",
          },
          {
            internalType: "bool",
            name: "claimEnabled",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "revoked",
            type: "bool",
          },
          {
            internalType: "uint64",
            name: "mintedAt",
            type: "uint64",
          },
        ],
        internalType: "struct V3rific.Product",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const satisfies Abi;
