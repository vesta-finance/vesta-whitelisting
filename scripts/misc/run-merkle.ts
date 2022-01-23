import { BigNumber } from "ethers"
import BalanceTree from "./balance-tree"

async function main() {
	const whitelist: { account: string; amount: BigNumber }[] = [
		{
			account: "0x31c57298578f7508b5982062cfec5ec8bd346247",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x1b1e98f4912ae9014064a70537025ef338e6ad67",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x2e7108e381e9acab03aa1b4819aacb50d2964532",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xcb3e7f6ba9a335069935ac1af5a5f28ac6b56d3b",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x559d166ecc8155c8f91b65229d0e62596ba71b88",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x5b5e5cc89636ca2685b4e4f50e66099ebcfab638",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xe70bf1970930cbd5b5a6d00319c520928ec66868",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xf36d9de9141d6112e2e38cc6591358e8eb789f71",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x6d067847099f3eaf2f26c42ff6a358651aee612b",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x0a9d1b2e6b8210b671937a7f936cd60716a08fb3",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xa79d78b6a68ac996eebe2fb7742873f6ebf3272d",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x0ebabb3fa962db0c0a597f81e5e86fc8c7928784",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xb9be147d5493ae3c933e267d07d4a2a9ab9f3e6e",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x2254df3d0c13dbe09cf24fde95774f4a8eaddd4d",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x8ca272981ad6ba94ae6dc15544e716b1bc8889d0",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x101ccbff93c60f93274892830fb830dda17d0737",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x4b5797fd9c936db78b6d18f10272816ec88abcec",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x148d3b55a612f1ea8e8096a11d1674bf9d8fb6f9",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x4906d0389d8e88ae17616fc255abf3271f892336",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xd905e564b00e6df102f1d8f1a4f6e8cd5af7f12b",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xa9116cc87df3567044bea1cd6be3c4e160b98e0f",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x297536f7828accba076f86ffd1adb0d0b98398a3",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x1267a7404f6d55588488466f84bbc3e74f17702d",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x01395fffabcfaaea920757eadde00aada33c14b6",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x46a108abc71d832b247567b4136eb92778609e98",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x52834ce7add049e62f53fda7a1f9feb07776f06b",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xb7ccf590c6a1305c805765642710d606f81bbaed",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xa34da970a327e842eae026f34bf1e18d611c96a8",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x907e484e70bfa45c065698cc98abf60df5e2ba5e",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x52ea519563bffaa68485fc65ae43c18e971f9c18",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x152c5c8ce14c466f0eed40ffd9772a977a860799",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x9c9591e1df6d37016b96a263a5d8a55e65b471f3",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x136ae36921feb42ddcac41c40789de7a8c136eae",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x75c2b924570282aee158c50d00ec380bf6e44d16",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x89451cfae82ffb4a0a614865baf46cc2890d5894",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xfb6a3203a92209723c12869787ef31db13466991",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xb2326025541c2d46b347925c50aed0e59b5f0226",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x05533728dc72958ecdee5ac4d49cc9d94c4e97a7",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x0609d9ddcafcf0ac3dcc3e067d783c5e4e6eba3b",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x8517b0534d1951c6ba53e15d5afe5413baaf36ab",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xc4079d976444baedff51c0f70723ae60aa45bc28",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x391b104ec0f02f924261b93c9194051dae86050b",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xe02983f14257892e4cd0fbf5912133134df17069",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xacbc28d8ed87430333f696d44c9792bbe0955789",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xefdb0e28c413dd9b52565ae4791100d66b4044ac",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x914499cfd1536b821589207a3da77a314ce59241",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x245eeb18b68269be11dbf56878e20de26f106e2d",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xb64b7a97cafad3eb900eae9f91cca86d634fe9b5",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x3a3789a82c08d841c09d570559181842f4ed5b7a",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xc3e9e45cf20770c66782c9c527cd705143551c74",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x19df5f08f657eb88374b6e006adfe89eea7faeec",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xae922ceec21d67b7b89e6f9f4fa56ee4237e22a2",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x3745648703e997cb0b19b99e635b66a00650b2cb",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xf3bf610ddd1e6c5ddfe5f168a5b70cbe58fa4634",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x7e53c891a79509b00a3d66a5cc635f3404ebe3ee",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x89356be2534990a759d6d79808c365e2a0c4e4d3",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x413a20f2b9a66da4bbdfbcf42d310901e5694a8e",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x9e661ec89677a1a135d847824a2e7bf6ea8ce678",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x430747819cb4c9fef4c22a95b2978171f5f5afc9",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xe78083514c1ffa4ce749d83478334c7e5a8fa411",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x1c007d57288e23b66c9b853ab684985b6e46b1be",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x9eaab86467e744228b198750de28845d9fe1f08f",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x9fe588bcf7b9c88655efa9773448609dfe26de28",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xf9125b45019424fe93aa25fd7f0f203cd004929c",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xdad211ae492cd53f1e6405a0349e0ddcba57c520",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xb626de714a3f7cfba1f5a0ca28a1ffcd487bdf8c",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xc4eef988768c139768d83c000d5bf9d9a7ab1a60",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x5cba1a7e83448816eb11ce5ef67539068dd5c7e5",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x78e0a4e06769032ee2f71115f93bb9bcd32974d4",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x7785aa9197e4409ca2d5225181c1b3e2c3a3407d",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x95a766d7daab44d71736c9468765e93ee5be8f06",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x6197a50a398dd54cdb9e4126e33f0d5bbef3c2bc",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x5f4fb0ff4b49eaea7a3355aa03c68a982ac7e973",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xa19e967bfede2dfe8662ca0dc030b70a4346b95b",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xab632ce1b0171b3ab4fe5648636db30e4160adcd",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xdaa5bc85a91821ca6feca7d5d32f4ca6d10fd953",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x4a4ed0efee78f80bc3cb07d9f7083c8ab9aa6c9b",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x9dd058afe95bffe483abf591d307520c329c47e1",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x583b9be5666ea2f04dfdb5df78479e77817bb3ee",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x2fd19449d3a4144433462e8e46add92cfb2a8c7e",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xd4e79c42efca833be27f20c8c251b2cf064703dd",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x642801c9b53e6e7029c74027bd36367a92dc8cdb",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xf25b39611d0f336660f23a16553ebfae4c197b99",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x4a971e782942c311b342447c1c19f12fba55612c",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xd6390f3920072383ca64c48eb0e2310e604c2ff9",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xa529a2c386d17adc85fefed739930e2290c652c8",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xf124037de96a061d039d120b8f4421bde99cf6c4",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x283b0d8b767fd3350207a01330b496c8169ca38a",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x496301d69b45f99d7c9af92cbe42d7d88f1acfb8",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x3827464ccc8c9df45b1d218c9aa5f2f66ef9797b",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x5431cedf14c1428c9b9a21b69f9e0f995c6d8014",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x1e2a8c2958249eb2d0c7b02f8d71a4e24bc30268",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xd4b177ee423a2902cd84c9c7fd63bfe78a123cf6",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x2a3579830dcc8f51fed339252b99de530488cf62",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x7f2d1895c5ff2e5a0debab17c37d169f0898d37e",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x93e33f73d6cba978cf0281de96a5fbfc12732182",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xc25328520960df65bb9abac30c4c700238d6ee43",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0x61ac1e377c4f1c5e7cd5967bff6bab5e7cdf21ef",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xc74d91f74cfa7711d8b3e8b3272579960b0d91db",
			amount: BigNumber.from("100000000000000000000"),
		},
		{
			account: "0xcad2b86a5c9e7ba4b9fa60a0eb2c9543f8dbaca8",
			amount: BigNumber.from("100000000000000000000"),
		},
	]

	const bt = new BalanceTree(whitelist)
	console.log("Root:", bt.getHexRoot())
	// outputProofKey(bt, whitelist, 0, 5)
}

function outputProofKey(
	bt: BalanceTree,
	whitelist: any,
	start: number,
	end: number
) {
	for (let i = start; i < end; i++) {
		console.log(bt.getProof(i, whitelist[i].account, whitelist[i].amount))
		console.log("")
	}
}

main().catch(error => {
	console.error(error)
	process.exitCode = 1
})
