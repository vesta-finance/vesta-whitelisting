import { ContractFactory } from "ethers"
import { writeFileSync, existsSync } from "fs"
import { IDeployConfig } from "../config/DeployConfig"
import { colorLog, Colors } from "./ColorConsole"
import { ethers, upgrades } from "hardhat"

export const ZERO_ADDRESS: string = "0x" + "0".repeat(40)

export class DeploymentHelper {
	path: string = "./scripts/history/"
	config: IDeployConfig
	deploymentState: { [id: string]: IDeploymentHistory } = {}

	constructor(config: IDeployConfig) {
		this.config = config

		if (!existsSync(this.path + config.outputFile)) {
			return
		}

		this.deploymentState = require("../history/" + config.outputFile)
	}

	async deployUpgradeableContract(
		contractFactory: ContractFactory,
		contractName: string,
		initializerFunctionName?: string,
		...args: Array<any>
	) {
		const [findOld, address] = this.tryToGetSaveContractAddress(contractName)

		if (findOld) {
			return contractFactory.attach(address)
		}

		const contract =
			initializerFunctionName !== undefined
				? await upgrades.deployProxy(contractFactory, args, {
						initializer: initializerFunctionName,
				  })
				: await upgrades.deployProxy(contractFactory)

		this.deploymentState[contractName] = {
			address: contract.address,
			proxyAdmin: (await upgrades.admin.getInstance()).address,
		}

		this.saveDeployment()
		return contract
	}

	async deployContractByName(contractFileName: string, name?: string) {
		return await this.deployContract(
			await ethers.getContractFactory(contractFileName),
			name !== undefined ? name : contractFileName
		)
	}

	async deployContract(contractFactory: ContractFactory, contractName: string) {
		const [findOld, address] = this.tryToGetSaveContractAddress(contractName)

		if (findOld) {
			return contractFactory.attach(address)
		}

		const contractDeployer = await contractFactory.deploy()
		const contract = await contractDeployer.deployed()

		this.deploymentState[contractName] = {
			address: contract.address,
		}

		this.saveDeployment()

		colorLog(Colors.green, `Deployed ${contractName} at ${contract.address}`)
		return contract
	}

	saveDeployment() {
		const deploymentStateJson = JSON.stringify(this.deploymentState, null, 2)
		writeFileSync(this.path + this.config.outputFile, deploymentStateJson)
	}

	tryToGetSaveContractAddress(contractName: string): [boolean, string] {
		if (this.deploymentState[contractName] !== undefined) {
			const address = this.deploymentState[contractName].address
			colorLog(
				Colors.green,
				`${contractName} already exists. Loading ${address}`
			)

			return [true, address]
		}

		return [false, ""]
	}
}
