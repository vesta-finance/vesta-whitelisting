import { IDeployConfig } from "./config/DeployConfig"
import { DeploymentHelper } from "./utils/DeploymentHelper"
import { Deployer } from "./Deployer"
import { BigNumber } from "ethers"

const config: IDeployConfig = {
	outputFile: "./testnet_deployments.json",
	adminWallet: "0x87209dc4B76b14B67BC5E5e5c0737E7d002a219c",
	vestaTokenAddress: "0x183CEe30F1C9c126907d8355f25cad762632D7aE",
	totalSupply: 787787,
	whitelist: [
		{
			account: "0xdd923438e759af8e9326338e8c6329464149b8f4",
			amount: BigNumber.from("3873000000"),
		},
		{
			account: "0x2dFEa295f4d38BDf9fCCA4b35fdBf4B01E7dE701",
			amount: BigNumber.from("6322000000"),
		},
		{
			account: "0x87209dc4B76b14B67BC5E5e5c0737E7d002a219c",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0xCe24DB336Fa759d16f6B87A82D397d91EcBb3296",
			amount: BigNumber.from("1484144112"),
		},
	],
}

async function main() {
	const helper = new DeploymentHelper(config)

	if (config.vestaTokenAddress === "") {
		const ercMock = await helper.deployContractByName("ERC20Mock")
		await ercMock.mint(config.adminWallet, 100_000e18)
		config.vestaTokenAddress = ercMock.address
	}

	await new Deployer(config).run()
}

main().catch(error => {
	console.error(error)
	process.exitCode = 1
})
