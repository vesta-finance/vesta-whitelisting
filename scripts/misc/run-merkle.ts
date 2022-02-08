import { BigNumber } from "ethers"
import BalanceTree from "./balance-tree"

async function main() {
	const whitelist: Record<
		string,
		string
	> = require("../misc/whitelist-testnet.json")

	const bt = new BalanceTree(whitelist)
	console.log("Root:", bt.getHexRoot())

	Object.entries(whitelist).map(([wallet, amount]) => {
		console.log(`Prof of ${wallet}:`)
		outputProofKey(bt, wallet, amount)
		console.log("")
	})
}

function outputProofKey(bt: BalanceTree, wallet: string, amount: string) {
	console.log(bt.getProof(wallet, BigNumber.from(amount)))
}

main().catch(error => {
	console.error(error)
	process.exitCode = 1
})
