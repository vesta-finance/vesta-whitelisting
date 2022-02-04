import { IDeployConfig } from "./config/DeployConfig"
import { DeploymentHelper, ZERO_ADDRESS } from "./utils/DeploymentHelper"
import { Deployer } from "./Deployer"
import { BigNumber } from "ethers"

const config: IDeployConfig = {
	outputFile: "./testnet_deployments.json",
	adminWallet: "0x87209dc4B76b14B67BC5E5e5c0737E7d002a219c",
	vestaTokenAddress: "",
	totalSupply: 787787,
	whitelist: [
		{
			account: "0x7246a274656e797fab4b02eb1e0581d46f0358e2",
			amount: BigNumber.from("3873000000"),
		},
		{
			account: "0x87209dc4B76b14B67BC5E5e5c0737E7d002a219c",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0xCe24DB336Fa759d16f6B87A82D397d91EcBb3296",
			amount: BigNumber.from("1484144112"),
		},
		{
			account: "0x87209dc4B76b14B67BC5E5e5c0737E7d002a219c",
			amount: BigNumber.from("641025641"),
		},
	],
}

async function main() {
	const helper = new DeploymentHelper(config)
	const ercMock = await helper.deployContractByName("ERC20Mock")
	await ercMock.mint(config.adminWallet, 100_000e18)

	config.vestaTokenAddress = ercMock.address
	config.vestaTokenAddress = ZERO_ADDRESS

	await new Deployer(config).run()
}

main().catch(error => {
	console.error(error)
	process.exitCode = 1
})
