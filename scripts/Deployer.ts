import { IDeployConfig } from "./config/DeployConfig"
import { DeploymentHelper } from "./utils/DeploymentHelper"
import { ethers } from "hardhat"
import BalanceTree from "./misc/balance-tree"
import { BigNumber } from "ethers"

export class Deployer {
	config: IDeployConfig
	helper: DeploymentHelper

	constructor(config: IDeployConfig) {
		this.config = config
		this.helper = new DeploymentHelper(config)
	}

	async run() {
		const tokenPrice: BigNumber = BigNumber.from("375000000000000000") //0.375
		const e6_to_e18 = BigNumber.from(10).pow(12)

		const Whitelisting = await ethers.getContractFactory("Whitelisting")
		const VestingVsta = await ethers.getContractFactory("VestingVsta")
		const whitelisting = await this.helper.deployContract(
			Whitelisting,
			"Whitelisting"
		)

		const vesting = await this.helper.deployContract(VestingVsta, "VestingVsta")

		if (!(await whitelisting.isInitialized)) {
			const bt = new BalanceTree(this.config.whitelist)
			let totalAmountUSDC = BigNumber.from("0")

			this.config.whitelist.forEach(wl => {
				totalAmountUSDC = totalAmountUSDC.add(wl.amount)
			})

			//TO ETHER
			totalAmountUSDC = totalAmountUSDC.mul(e6_to_e18)
			const totalAmountToken = totalAmountUSDC
				.div(tokenPrice)
				.mul(ethers.utils.parseEther("1"))

			console.log(totalAmountToken)
			console.log("Root:", bt.getHexRoot())

			await whitelisting.setAddresses(
				this.config.vestaTokenAddress,
				vesting.address,
				tokenPrice,
				totalAmountToken.toString(),
				bt.getHexRoot()
			)
		}

		if (!(await vesting.isInitialized)) {
			this.config.vestaTokenAddress,
				await vesting.setAddresses(
					this.config.vestaTokenAddress,
					whitelisting.address
				)
		}
		await whitelisting.transferOwnership(this.config.adminWallet)
	}
}
