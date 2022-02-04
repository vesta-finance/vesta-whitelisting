/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IVestingVsta, IVestingVstaInterface } from "../IVestingVsta";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_entity",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_totalSupply",
        type: "uint256",
      },
    ],
    name: "addEntityVesting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IVestingVsta__factory {
  static readonly abi = _abi;
  static createInterface(): IVestingVstaInterface {
    return new utils.Interface(_abi) as IVestingVstaInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IVestingVsta {
    return new Contract(address, _abi, signerOrProvider) as IVestingVsta;
  }
}
