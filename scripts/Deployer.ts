import { IDeployConfig } from "./config/DeployConfig"
import { DeploymentHelper } from "./utils/DeploymentHelper"
import { ethers, upgrades } from "hardhat"
import BalanceTree from "./misc/balance-tree"
import { BigNumber, Contract, Signer } from "ethers"
import vstaAbi from "./abis/VSTAToken.json"
import { assert } from "chai"

export class Deployer {
	config: IDeployConfig
	helper: DeploymentHelper
	deployerWallet?: Signer
	tokenPrice: BigNumber = BigNumber.from("375000000000000000") //0.375
	e6_to_e18 = BigNumber.from(10).pow(12)
	whitelist: Record<string, string> = {}

	constructor(config: IDeployConfig) {
		this.config = config
		this.helper = new DeploymentHelper(config)
	}

	async run() {
		this.deployerWallet = (await ethers.getSigners())[0]
		this.whitelist = require(this.config.whitelistFilePath)

		assert(Object.keys(this.whitelist).length != 0, "Whitelist is empty")

		const [vsta, whitelisting, vesting] = await this.getContracts()

		const allowance = await vsta.allowance(
			this.deployerWallet.getAddress(),
			whitelisting.address
		)

		if (allowance == 0) {
			await vsta.approve(whitelisting.address, ethers.constants.MaxUint256)
		}

		await this.initWhitelisting(whitelisting, vesting)
		console.log("Whitelisting Initalized")

		await this.initVesting(vesting, whitelisting)
		console.log("Vesting Initalized")
	}

	async getContracts() {
		const vsta = new ethers.Contract(
			this.config.vestaTokenAddress,
			vstaAbi.abi,
			this.deployerWallet
		)

		const Whitelisting = await ethers.getContractFactory("Whitelisting")
		const VestingVsta = await ethers.getContractFactory("VestingVesta")
		const whitelisting = await this.helper.deployContract(
			Whitelisting,
			"Whitelisting"
		)

		const vesting = await this.helper.deployUpgradeableContract(
			VestingVsta,
			"VestingVesta"
		)

		return [vsta, whitelisting, vesting]
	}

	async initWhitelisting(whitelisting: Contract, vesting: Contract) {
		const bt = new BalanceTree(this.whitelist)
		let totalAmountUSDC = BigNumber.from("0")

		for (let key in this.whitelist) {
			totalAmountUSDC = totalAmountUSDC.add(this.whitelist[key])
		}

		//TO ETHER
		totalAmountUSDC = totalAmountUSDC.mul(this.e6_to_e18)
		const totalAmountToken = totalAmountUSDC
			.div(this.tokenPrice)
			.mul(ethers.utils.parseEther("1"))

		console.log(totalAmountToken)
		console.log("Root:", bt.getHexRoot())

		await whitelisting.setAddresses(
			this.config.vestaTokenAddress,
			vesting.address,
			this.tokenPrice,
			totalAmountToken.toString(),
			bt.getHexRoot()
		)

		await whitelisting.transferOwnership(this.config.adminWallet)
	}

	async initVesting(vesting: Contract, whitelisting: Contract) {
		await vesting.setUp(this.config.vestaTokenAddress, whitelisting.address)
		await vesting.transferOwnership(this.config.adminWallet)
	}
}
