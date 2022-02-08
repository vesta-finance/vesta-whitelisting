import MerkleTree from "./merkle-tree"
import { BigNumber, utils } from "ethers"

export default class BalanceTree {
	private readonly tree: MerkleTree
	constructor(whitelists: Record<string, string>) {
		this.tree = new MerkleTree(
			Object.entries(whitelists).map(([address, amount]) => {
				return BalanceTree.toNode(address, BigNumber.from(amount))
			})
		)
	}

	public static verifyProof(
		account: string,
		amount: BigNumber,
		proof: Buffer[],
		root: Buffer
	): boolean {
		let pair = BalanceTree.toNode(account, amount)
		for (const item of proof) {
			pair = MerkleTree.combinedHash(pair, item)
		}

		return pair.equals(root)
	}

	// keccak256(abi.encode(index, account, amount))
	public static toNode(account: string, amount: BigNumber): Buffer {
		return Buffer.from(
			utils
				.solidityKeccak256(["address", "uint256"], [account, amount])
				.substr(2),
			"hex"
		)
	}

	public getHexRoot(): string {
		return this.tree.getHexRoot()
	}

	// returns the hex bytes32 values of the proof
	public getProof(account: string, amount: BigNumber): string[] {
		return this.tree.getHexProof(BalanceTree.toNode(account, amount))
	}
}
