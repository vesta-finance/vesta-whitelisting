import { BigNumber } from "ethers"

export interface IDeployConfig {
	outputFile: string
	adminWallet: string
	vestaTokenAddress: string
	totalSupply: number
	whitelist: { account: string; amount: BigNumber }[]
}
