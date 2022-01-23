import { IDeployConfig } from "./config/DeployConfig"
import { DeploymentHelper } from "./utils/DeploymentHelper"
import { ethers } from "hardhat"

export class Deployer {
	config: IDeployConfig
	helper: DeploymentHelper

	constructor(config: IDeployConfig) {
		this.config = config
		this.helper = new DeploymentHelper(config)
	}

	async run() {
		const tokenPrice: string = (8e17).toString()

		const Whitelisting = await ethers.getContractFactory("Whitelisting")
		const whitelisting = await this.helper.deployContract(
			Whitelisting,
			"Whitelisting"
		)

		await whitelisting.setAddresses(
			this.config.vestaTokenAddress,
			this.config.lockedVstaAddress,
			tokenPrice,
			this.config.merkleRoot
		)

		await whitelisting.transferOwnership(this.config.adminWallet)
	}
}
