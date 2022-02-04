import { IDeployConfig } from "./config/DeployConfig"
import { DeploymentHelper } from "./utils/DeploymentHelper"
import { ethers } from "hardhat"
import BalanceTree from "./misc/balance-tree"
import { BigNumber, Contract, Signer } from "ethers"
import vstaAbi from "./abis/VSTAToken.json"

export class Deployer {
	config: IDeployConfig
	helper: DeploymentHelper
	deployerWallet?: Signer
	tokenPrice: BigNumber = BigNumber.from("375000000000000000") //0.375
	e6_to_e18 = BigNumber.from(10).pow(12)

	constructor(config: IDeployConfig) {
		this.config = config
		this.helper = new DeploymentHelper(config)
	}

	async run() {
		this.deployerWallet = (await ethers.getSigners())[0]

		const [vsta, whitelisting, vesting] = await this.getContracts()

		const allowance = await vsta.allowance(
			this.deployerWallet.getAddress(),
			whitelisting.address
		)

		if (allowance == 0) {
			await vsta.approve(whitelisting.address, ethers.constants.MaxUint256)
		}

		if (!(await whitelisting.isInitialized)) {
			await this.initWhitelisting(whitelisting, vesting)
			console.log("Whitelisting Initalized")
		}

		if (!(await vesting.isInitialized)) {
			await this.initVesting(vesting, whitelisting)
			console.log("Vesting Initalized")
		}

		await whitelisting.transferOwnership(this.config.adminWallet)
	}

	async getContracts() {
		const vsta = new ethers.Contract(
			this.config.vestaTokenAddress,
			vstaAbi.abi,
			this.deployerWallet
		)

		const Whitelisting = await ethers.getContractFactory("Whitelisting")
		const VestingVsta = await ethers.getContractFactory("WhitelistVestingVesta")
		const whitelisting = await this.helper.deployContract(
			Whitelisting,
			"Whitelisting"
		)

		const vesting = await this.helper.deployContract(
			VestingVsta,
			"WhitelistVestingVesta"
		)

		return [vsta, whitelisting, vesting]
	}

	async initWhitelisting(whitelisting: Contract, vesting: Contract) {
		const bt = new BalanceTree(this.config.whitelist)
		let totalAmountUSDC = BigNumber.from("0")

		this.config.whitelist.forEach(wl => {
			totalAmountUSDC = totalAmountUSDC.add(wl.amount)
		})

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
	}

	async initVesting(vesting: Contract, whitelisting: Contract) {
		this.config.vestaTokenAddress,
			await vesting.setAddresses(
				this.config.vestaTokenAddress,
				whitelisting.address
			)
	}
}
