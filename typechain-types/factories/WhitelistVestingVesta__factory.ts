/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  WhitelistVestingVesta,
  WhitelistVestingVestaInterface,
} from "../WhitelistVestingVesta";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "NAME",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SIX_MONTHS",
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
    inputs: [],
    name: "TWO_YEARS",
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
  {
    inputs: [],
    name: "claimVSTAToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "entitiesVesting",
    outputs: [
      {
        internalType: "uint256",
        name: "createdDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalSupply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "startVestingDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endVestingDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "claimed",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_entity",
        type: "address",
      },
    ],
    name: "getClaimableVSTA",
    outputs: [
      {
        internalType: "uint256",
        name: "claimable",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_entity",
        type: "address",
      },
    ],
    name: "isEntityExits",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isInitialized",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_vstaAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_whitelisting",
        type: "address",
      },
    ],
    name: "setAddresses",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061001a3361001f565b61006f565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b610d2c8061007e6000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c806390107afe1161008c578063ba579c7411610066578063ba579c7414610233578063db7a1ef31461023d578063e69c062514610250578063f2fde38b1461025857600080fd5b806390107afe146101b4578063a3f4df7e146101c7578063aac12e291461020857600080fd5b806301edf6a0146100d4578063392e53cd146100f257806357fe76401461011657806367c250441461017c578063715018a61461018f5780638da5cb5b14610199575b600080fd5b6100df6303c2670081565b6040519081526020015b60405180910390f35b60005461010690600160a01b900460ff1681565b60405190151581526020016100e9565b610154610124366004610b26565b60036020819052600091825260409091208054600182015460028301549383015460049093015491939092909185565b604080519586526020860194909452928401919091526060830152608082015260a0016100e9565b6100df61018a366004610b26565b61026b565b61019761033a565b005b6000546040516001600160a01b0390911681526020016100e9565b6101976101c2366004610b41565b610379565b6101fb6040518060400160405280601581526020017457686974656c69737456657374696e67566573746160581b81525081565b6040516100e99190610ba0565b610106610216366004610b26565b6001600160a01b0316600090815260036020526040902054151590565b6100df62eff10081565b61019761024b366004610bd3565b61047a565b610197610619565b610197610266366004610b26565b61068c565b6001600160a01b0381166000908152600360208181526040808420815160a0810183528154815260018201549381019390935260028101549183018290529283015460608301526004909201546080820152904210156102cb5750919050565b806060015142106102f057608081015160208201516102e991610724565b9150610334565b610331816080015161032b61031284600001514261072490919063ffffffff16565b6020850151610325906303c26700610737565b90610743565b90610724565b91505b50919050565b6000546001600160a01b0316331461036d5760405162461bcd60e51b815260040161036490610bfd565b60405180910390fd5b610377600061074f565b565b6000546001600160a01b031633146103a35760405162461bcd60e51b815260040161036490610bfd565b600054600160a01b900460ff16156103f35760405162461bcd60e51b8152602060048201526013602482015272105b1c9958591e48125b9a5d1a585b1a5e9959606a1b6044820152606401610364565b6001600160a01b03821661043d5760405162461bcd60e51b815260206004820152601160248201527024b73b30b634b2102b29aa209030b2323960791b6044820152606401610364565b6000805460ff60a01b1916600160a01b179055600180546001600160a01b0384166001600160a01b03199091161790556104768161068c565b5050565b6000546001600160a01b031633146104a45760405162461bcd60e51b815260040161036490610bfd565b6001600160a01b0382166104ec5760405162461bcd60e51b815260206004820152600f60248201526e496e76616c6964204164647265737360881b6044820152606401610364565b6001600160a01b0382166000908152600360205260409020541561055c5760405162461bcd60e51b815260206004820152602160248201527f456e7469747920616c72656164792068617320612056657374696e672052756c6044820152606560f81b6064820152608401610364565b806002600082825461056e9190610c48565b925050819055506040518060a001604052804281526020018281526020016105a262eff1004261079f90919063ffffffff16565b81526020016105b5426303c2670061079f565b8152600060209182018190526001600160a01b038086168252600380845260409283902085518155938501516001808601919091559285015160028501556060850151908401556080909301516004909201919091555461047691163330846107ab565b336000818152600360205260409020546106805760405162461bcd60e51b815260206004820152602260248201527f456e7469747920646f65736e2774206861766520612056657374696e672052756044820152616c6560f01b6064820152608401610364565b6106893361081c565b50565b6000546001600160a01b031633146106b65760405162461bcd60e51b815260040161036490610bfd565b6001600160a01b03811661071b5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610364565b6106898161074f565b60006107308284610c60565b9392505050565b60006107308284610c77565b60006107308284610c99565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60006107308284610c48565b6040516001600160a01b03808516602483015283166044820152606481018290526108169085906323b872dd60e01b906084015b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152610890565b50505050565b60006108278261026b565b905080610832575050565b6001600160a01b03821660009081526003602052604081206004810180549192849261085f908490610c48565b90915550506002546108719083610724565b60025560015461088b906001600160a01b03168484610962565b505050565b60006108e5826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b03166109929092919063ffffffff16565b80519091501561088b57808060200190518101906109039190610cb8565b61088b5760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b6064820152608401610364565b6040516001600160a01b03831660248201526044810182905261088b90849063a9059cbb60e01b906064016107df565b60606109a184846000856109a9565b949350505050565b606082471015610a0a5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b6064820152608401610364565b843b610a585760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610364565b600080866001600160a01b03168587604051610a749190610cda565b60006040518083038185875af1925050503d8060008114610ab1576040519150601f19603f3d011682016040523d82523d6000602084013e610ab6565b606091505b5091509150610ac6828286610ad1565b979650505050505050565b60608315610ae0575081610730565b825115610af05782518084602001fd5b8160405162461bcd60e51b81526004016103649190610ba0565b80356001600160a01b0381168114610b2157600080fd5b919050565b600060208284031215610b3857600080fd5b61073082610b0a565b60008060408385031215610b5457600080fd5b610b5d83610b0a565b9150610b6b60208401610b0a565b90509250929050565b60005b83811015610b8f578181015183820152602001610b77565b838111156108165750506000910152565b6020815260008251806020840152610bbf816040850160208701610b74565b601f01601f19169190910160400192915050565b60008060408385031215610be657600080fd5b610bef83610b0a565b946020939093013593505050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b634e487b7160e01b600052601160045260246000fd5b60008219821115610c5b57610c5b610c32565b500190565b600082821015610c7257610c72610c32565b500390565b600082610c9457634e487b7160e01b600052601260045260246000fd5b500490565b6000816000190483118215151615610cb357610cb3610c32565b500290565b600060208284031215610cca57600080fd5b8151801515811461073057600080fd5b60008251610cec818460208701610b74565b919091019291505056fea26469706673582212208e9b6e88089004b84c9b94b475001970d91163f7c1830c2b90d3257f7f77857164736f6c634300080b0033";

type WhitelistVestingVestaConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: WhitelistVestingVestaConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class WhitelistVestingVesta__factory extends ContractFactory {
  constructor(...args: WhitelistVestingVestaConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "WhitelistVestingVesta";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<WhitelistVestingVesta> {
    return super.deploy(overrides || {}) as Promise<WhitelistVestingVesta>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): WhitelistVestingVesta {
    return super.attach(address) as WhitelistVestingVesta;
  }
  connect(signer: Signer): WhitelistVestingVesta__factory {
    return super.connect(signer) as WhitelistVestingVesta__factory;
  }
  static readonly contractName: "WhitelistVestingVesta";
  public readonly contractName: "WhitelistVestingVesta";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WhitelistVestingVestaInterface {
    return new utils.Interface(_abi) as WhitelistVestingVestaInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): WhitelistVestingVesta {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as WhitelistVestingVesta;
  }
}