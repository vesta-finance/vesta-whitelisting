import { IDeployConfig } from "./config/DeployConfig"
import { Deployer } from "./Deployer"
import { DeploymentHelper, ZERO_ADDRESS } from "./utils/DeploymentHelper"

const config: IDeployConfig = {
	outputFile: "./testnet_deployments.json",
	adminWallet: "0x87209dc4B76b14B67BC5E5e5c0737E7d002a219c",
	vestaTokenAddress: "",
	totalSupply: 787787,
	whitelist: [],
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
