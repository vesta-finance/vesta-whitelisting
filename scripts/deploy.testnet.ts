import { IDeployConfig } from "./config/DeployConfig"
import { DeploymentHelper } from "./utils/DeploymentHelper"
import { Deployer } from "./Deployer"
import { BigNumber } from "ethers"

const config: IDeployConfig = {
	outputFile: "./testnet_deployments.json",
	adminWallet: "0x87209dc4B76b14B67BC5E5e5c0737E7d002a219c",
	vestaTokenAddress: "0x183CEe30F1C9c126907d8355f25cad762632D7aE",
	whitelistFilePath: "./data/whitelist-testnet.json",
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
