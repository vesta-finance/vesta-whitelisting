import { IDeployConfig } from "./config/DeployConfig"
import { Deployer } from "./Deployer"
import { colorLog, Colors, addColor } from "./utils/ColorConsole"
import * as readline from "readline-sync"
import { BigNumber } from "ethers"

const config: IDeployConfig = {
	outputFile: "./testnet_deployments.json",
	adminWallet: "0x87209dc4B76b14B67BC5E5e5c0737E7d002a219c",
	vestaTokenAddress: "0xa684cd057951541187f288294a1e1c2646aa2d24",
	totalSupply: 787787,
	whitelist: [
		{
			account: "0x7246a274656e797fab4b02eb1e0581d46f0358e2",
			amount: BigNumber.from("3873000000"),
		},
		{
			account: "0x81aa4f3b7e2c17a2e98170136f175d842b5fa03e",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x735c11b1a57b7ab1b9a0ba409820b3005f09a7ac",
			amount: BigNumber.from("3873000000"),
		},
		{
			account: "0xc2f607b2f12b0e67ea00a787ab6ecea7d5cce62b",
			amount: BigNumber.from("3873000000"),
		},
		{
			account: "0x0942086a607b12fe0dd5467620e6231c354ba175",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0xd53db76369fbb6584e0bec45d4e8d62eb46e5700",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0xa18e6e5572ef049f0ce50300b5c81242e13bd6f1",
			amount: BigNumber.from("3873000000"),
		},
		{
			account: "0xe46b3c084a97ac37c49b8c4cef15db1b30e639e1",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x50e154ad82b3d9bfcfba58e4a6f45438e1f69cda",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x410dcf5bc94a68c8de5ae99c18a89a3a8946462c",
			amount: BigNumber.from("3873000000"),
		},
		{
			account: "0xa5fe8f281da9c360ee81d1e75208edeb26d9e5ab",
			amount: BigNumber.from("1482000000"),
		},
		{
			account: "0x670066ea79e44a38d7f69776967dcd9b9f50f794",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0xf627e5f4bad95a956468d8bb6ee20b119f992e96",
			amount: BigNumber.from("3873000000"),
		},
		{
			account: "0x35a55b0caa6d9ea3d6e1e919e58971447e1f49d0",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0xdb9118dbbefa5de2a67df2f13e8f7e41a52c2df4",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0xf9fe2265e51580ec5682156bbd5b20b23c627da2",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x7fb3e57da24cf884e34424709138d27a54b1fec3",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0xd06d51d73d375bdfd47a3edec155dd31cd4c54fc",
			amount: BigNumber.from("510193165"),
		},
		{
			account: "0xccac7ca73ac0b892bd99b144f8a2bf36fa9fb58d",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x3b99e794378bd057f3ad7aea9206fb6c01f3ee60",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0xda2d3b0a9e2c39e09ac2504df2572b3b28093d56",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0xcc98cfdc5f5480d8dd0a0d0a7f80506eb30d5159",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0xa52eb363894880bde66afcaaf2f01cc57fc7f617",
			amount: BigNumber.from("3873000000"),
		},
		{
			account: "0xd7cc82eba767119743bc55af305915c10a9c4077",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x7cf9f878942489b7a1725d628a9e59fb1b38ab27",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0xd47a742f7ae0dcab41375a22283a70ebe3716711",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x11573bc2152e215ed3071d7668084518cbbed215",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x40dcba8e2508ddaa687fc26f9491b8cca563c845",
			amount: BigNumber.from("3873000000"),
		},
		{
			account: "0xba7568be6f22b2e89291fb7c42aa0ed01d0232ce",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0xd827e68974edb0735cf3e923b236386887e8336c",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x211fdfa74b2b0cb1c561d9448e7e96b4c210cd8f",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0xecdb01914da362c0fec0b5559227574a31647aff",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0xfcd459abf85c288d9c82e4fa3cd549273db1b519",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x6e44635fbf182811ae9fb31163285caf5c30d88d",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x9030784b5784d3b1cdcfb90ebc0438d51ee9c80b",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x2c82a8e3973091ac5f63cef7616ca163d4b9916c",
			amount: BigNumber.from("3873000000"),
		},
		{
			account: "0xc8a6fdd2586af7980776dc610c159a92e9db11c3",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0xd2a78bb82389d30075144d17e782964918999f7f",
			amount: BigNumber.from("3873000000"),
		},
		{
			account: "0x5a53b10a0b56e558f4cf9bce63a647f815932960",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0xe2626fbb35c6ce84962e1c8e8adcef1d00247477",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0xd753c064b7570df7e1a77d9ef2fceb1203a4ad1e",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0xb94be5cdf97401560507792e92c3a29102e5457f",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x7ff4f8fe1dbbba8dc27103359bf96e97a4d44114",
			amount: BigNumber.from("3873000000"),
		},
		{
			account: "0x5b38f5463e758f944b63652ffca462691c7bc174",
			amount: BigNumber.from("3873000000"),
		},
		{
			account: "0xf2bafa3cb26cfd8ddbfa5957eda9a77dffdea84e",
			amount: BigNumber.from("3873000000"),
		},
		{
			account: "0x65694e1fa5de473a09c70073f356a49e5cae3b38",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x0f8361ef329b43fa48ac66a7cd8f619c517274f1",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0xebe8184a565382a99713cbf58ba756ad6af5421f",
			amount: BigNumber.from("3873000000"),
		},
		{
			account: "0x6dfd2e7c2c37239f65b5a0bbf325fb3196df52b8",
			amount: BigNumber.from("3873000000"),
		},
		{
			account: "0xf067a77ed156f328982f0b927e0e9659bd4c144a",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x1afb7ba8e4cf8ddf7f057484dd6a8695951f76f8",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x96fca82bb2ce4c5a700a14581412366cc05dd6fa",
			amount: BigNumber.from("3873000000"),
		},
		{
			account: "0x0ead01d3d2ed336d12ca73e245d2acd09c964eb8",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0xd111886cb7eff60f390e8f4c4f7c288c21988d51",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x2364aa42aa606e03e50c46989cdde5a260c8d198",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x491b4a99c0ad9da7342ffe48b6c332de52e7706d",
			amount: BigNumber.from("3873000000"),
		},
		{
			account: "0x5bdef91394dc80b156bd1ec270440b82659d03e6",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x020f27e574f7fc41ce0d5f744f83245b41653072",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0xb9a532db4831a3af6b6936424a641cc853d2bc54",
			amount: BigNumber.from("1340000000"),
		},
		{
			account: "0xf5d9cd9bc51a0a59598a5bcd8eb6440002be3e64",
			amount: BigNumber.from("309865410"),
		},
		{
			account: "0x61ed4acbd4a9aede4cb78b702e738b03d94b9fe9",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x4f8d7711d18344f86a5f27863051964d333798e2",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x61ed4acbd4a9aede4cb78b702e738b03d94b9fe9",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0xd2777200dbe1aa55ed219079e69fdcd83c2ef741",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x020eb226e93362d1304bc97a3dd07231b1cdf097",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0xba1fa72be53a1693de4867dea60fa9f041073bef",
			amount: BigNumber.from("1484000000"),
		},
		{
			account: "0xc62bc64af9f0e2406d1546f0136682d628b65b98",
			amount: BigNumber.from("150000000"),
		},
		{
			account: "0x0f3f647e19ddf45d1a963527db2af07c8175db20",
			amount: BigNumber.from("3873000000"),
		},
		{
			account: "0x81eee01e854ec8b498543d9c2586e6adca3e2006",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0xf7586ef1426ccbf4e818f7391b4960e8898ab980",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x168eb064e86cb2cb2f72a6798ccf6eb24a48ce9a",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x4a1332be364b686ab1a1addc47287cfa58f51ce3",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0xe55432f7b77d556c472b175c759a2ee714a1652a",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x7ca38bac0a7c2d603e0d877f2c16e6792d7e9ee5",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x412fc89b04e621b08f7d1fe203d8743714254d7b",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x1757c55a6029a5e54e4795767a4172bade391f15",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0xc29cea6b552fbf76dee19905dd59ae87a9c0f089",
			amount: BigNumber.from("1484000000"),
		},
		{
			account: "0x26d747d536230762adcb130d542a752499cf2951",
			amount: BigNumber.from("3250000000"),
		},
		{
			account: "0x44dcf3b86ee7a255ed915c16ca3979324c9a868b",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x22f6edb55790b0fe841c5ba9aa30792ebcb55863",
			amount: BigNumber.from("3873000000"),
		},
		{
			account: "0x31b1aab4d74d74839aff794db74f09cae552302c",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x7c99ad27f9ac5f3d660623a169e072052334bbfc",
			amount: BigNumber.from("1484144112"),
		},
		{
			account: "0x6adcf08deaaf5913079707f923279ef4c6d5225e",
			amount: BigNumber.from("642000000"),
		},
		{
			account: "0x1edc598c5f23d90ee84229a43a09d1fd42aff13e",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0xc1b172595ddc335a9dd80b50117e457ce124bc36",
			amount: BigNumber.from("3873000000"),
		},
		{
			account: "0xee36bfa458cd05740ce65157a79dcc2908ef74f7",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x87d9c2d9990a9f3a18f1377ff20d9945f9eb3792",
			amount: BigNumber.from("642000000"),
		},
		{
			account: "0xc181fc1c216c0e2ff41c75c52b2c20f6cbb1c8d1",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x26ece395fbc32f4f8cb54ea01466e2fbe8fbdd58",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x38140e35fda3f160ddb06e0637488a3e174acbbc",
			amount: BigNumber.from("3873000000"),
		},
		{
			account: "0x2dfea295f4d38bdf9fcca4b35fdbf4b01e7de701",
			amount: BigNumber.from("1000000"),
		},
		{
			account: "0x6bdd846122eb546fccb3c362d9c8324affaddd5c",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0xfb735452629b6bb1238f3f2d6a009631d462b67a",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0x819e8ca8c93c557184b850e601d89ffd1616da03",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x1f13a5dc44911ebd98ea1b55ab5b7b2a99acca14",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0x819e8ca8c93c557184b850e601d89ffd1616da03",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xff634f9ed1005198f3ae614328d2274c97e97b56",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x9b19af2ddce2f38b1b3b8b775f57e196c93ce661",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xa32af4a7908827bcef54c877afb072a777f8556d",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0xe4d6983a254e695cf3fe40172ad741973126656d",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xf88a427c5bf29acf58497c0088cbf7ca9836b7b2",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xc3746825f13c07dcd7e6fdb9c0c80a9affb18952",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xb731d2823f8d904c80560c6f084d35473b70b071",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x89fcb042d49e520b7bf1294bbd26f065b4531b99",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x59c4700d7f3716f949b5e2af1ca0f28103e82a0f",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0x2c51eb637ea595dd701745fff34fc5078a5a8a27",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xa04275c10f39e8675a34e147e2ef78d35129f2b6",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xbdb21e816e455e1642dbe8cef6668a62e180657b",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x2f2e822d0d47a0dfcf5d39e612fbff247351f054",
			amount: BigNumber.from("36500000"),
		},
		{
			account: "0x625ab39153fe8e0f9d53ade43a9d9c71cb7bb859",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x1986108b8f6c2f0643e84050db2ef54d2caad364",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x513aedace44cc9a0724ca276a8ceeee950903576",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xa182eae4440a7256c2e706df134aaa87034964f8",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x43b5f7fac76e84a7d96247c6603ad6facb027906",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x21cc6b36fa5bf6897e44e6b2a4de341e63de984a",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x0a3b67b88adf575654e071cf9c3e8065fc365967",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xf5d0318692f822680b733955828a25507f031c95",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x2f36a7758b662cb2485a9abd58e0cdd3a52aa9e8",
			amount: BigNumber.from("641020000"),
		},
		{
			account: "0x690b297329dbecfdd71a4763c052dfe6ffb44fe7",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x8e45b9d3b8495d642b3e812a965da9043702f76f",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x78fd06a971d8bd1ccf3ba2e16cd2d5ea451933e2",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0xa5cc7f3c81681429b8e4fc074847083446cfdb99",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xecd02810db92ff027ea1b0850d46bda963676d74",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0xcb927731f27898b30ad85964f9c5b784772cb924",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0xddf055c37f41671c945af93a4dc11ca5528b3eb6",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x6263b30617658f73a6febef5a673e5083c1b819f",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0x0e18511b32fecc6b36d4f5ab660df4b5989aced9",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xac907b3cb603e54b2f1270d772bf324e943d5826",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0xd54aa07a5e77bcc0269e2f1a830139fb72d818a9",
			amount: BigNumber.from("641020000"),
		},
		{
			account: "0xc0817e26a97fe6066321123fade456f96578ee1c",
			amount: BigNumber.from("641020000"),
		},
		{
			account: "0x83b33ba5b1446955bee0b3110c163150f555e40e",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x7181ef832537e62f9e63346ffbf96980805b725c",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0xc2bd60d1ff37c979a8fa9ebf8e5cacf0792045ac",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0x4007af5c02ea3640bc008ed93d0df67de6e29ed7",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0x31b87a9636dc5626a9c1b9aa730cbd17158d701f",
			amount: BigNumber.from("37490000"),
		},
		{
			account: "0xd3474bd2f558b12e83810ec7d8af14f2d1d08137",
			amount: BigNumber.from("35500000"),
		},
		{
			account: "0x6fcbbaccd027e8e29cdcec8b340784cb699bb348",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0x854f1269b659a727a2268ab86ff77cfb30bfb358",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x625d7862ab8b413f8af8a4b66bc083756730dec9",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x32e0be83d9613ca3d4ebc455f395a739a589d550",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xadbb2bdb90624935168f72323bee78b6250f0230",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0x71c8856b3b0446ae160d6d404156722c2ca16728",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0xffcd03e66eb1912434404d9d0be107f603ec9a1c",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x2eac3c6856080b6862b677c87889ffb5796d399b",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xf0e4d0d6094d6e13f61013a663b56154546b6c4a",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xd9cab5e026d638665b6b0ca5ae3991f4a44c70d5",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xdbc50b04023fd956f13d3f2625df7fbb022b996e",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0x97bdc2d95884c12051b24c1167339858add98dc8",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xef09ffed9b0f05e8128f90340b49fcccb9a183a2",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x5ac37964ebcbc68efb51497031ccc355a137dcc5",
			amount: BigNumber.from("641010000"),
		},
		{
			account: "0x0bd1e1eafafb74fb10cc461d4fc6e7f0a150fcbb",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0xdcf231d20d0061885dbaa310c9db6f97a5bfd175",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xf9bbb08373ef7367987985bdd8dfb8b4a6569029",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0x485bdd93173344e9194140345bd3338c8ddd8eb3",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0x96c825a14934a121e60fc3b2d5926b0f1f47802c",
			amount: BigNumber.from("37470000"),
		},
		{
			account: "0xb39035eb795fe81b9596b785a5c27d230d3cd55e",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x7e86b2e9b9e6c0ee02b0200648d9fcf20557e3c5",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xc77848cdd3d3c91a7c3b25d6443d2871bcbaffc1",
			amount: BigNumber.from("641020000"),
		},
		{
			account: "0x634ed8c2df8fbe613ee25debe1a460b4df2487d7",
			amount: BigNumber.from("100000000"),
		},
		{
			account: "0x99c868013bbb669d91e545789402694bbf5abc87",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x2b5e2514f4eeb653dd215f437b6cfea438215a48",
			amount: BigNumber.from("640629000"),
		},
		{
			account: "0x9b7d7c4ce98036c4d6f3d638a00e220e083116c7",
			amount: BigNumber.from("37490000"),
		},
		{
			account: "0x52bdd2c888169cda79ea98ab5ae36922e51effd4",
			amount: BigNumber.from("640970000"),
		},
		{
			account: "0x5c4a64abd18c714bde447bf32a8a34edd3b63e25",
			amount: BigNumber.from("37490000"),
		},
		{
			account: "0x4e81276e61db7fddd1001ebd6ecbfa28e06a2136",
			amount: BigNumber.from("282990000"),
		},
		{
			account: "0x60f931ee0ad1b80242f26b624722a0734ac26db2",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x87715066daf3c2e0a05085a2f1b6087b90aeaf82",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0x4f8aa212462fc0a9e7533524a497193a2639a86b",
			amount: BigNumber.from("641020000"),
		},
		{
			account: "0xe4518c427b210e950bb1cfb207e04d9af60f919a",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0x0a8f4e308b17f836eab6493f42e48ac07d30946d",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0x049808d5eaa90a2665b9703d2246dded34f1eb73",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0x13fd513c2104941bc399589b5391957b27392e8b",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x7565deddcb83a14b185eb9520914bb918cdfe983",
			amount: BigNumber.from("641020000"),
		},
		{
			account: "0x0ae3d5949202165584a270cbac7a733b0307a766",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0xe0ffa08a1cec12e1383953d779fc93c226e80761",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xcd7f6b72049c3b54416f9f26392cb271e74ca3fd",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0x2d60c99b6650e91c3464fe620dd7272f8044ef57",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xd319f112bf73eae5e3cf06bf8d4076cc5f8b1cd5",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xbe73748446811ebc2a4ddddcd55867d013d6136e",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0x3b136801010eae878d64b2be38f565bffa13f4f4",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0xbefd31181229b7d34532344e38899e0fea750818",
			amount: BigNumber.from("641020000"),
		},
		{
			account: "0xba96a2ba89ea249148ee599d2bbcd669de94d4b6",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x6cbf77816b158e1599ea9fc8cb71c8133d0e902c",
			amount: BigNumber.from("640000000"),
		},
		{
			account: "0xa51c5aebb2b706d4c8ad538db30966a3fcb56965",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xef2ec5ad843aa2a8d26325fed1dff83b58161cd2",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0x1594c8302e9884200d124028f9160a0e4ccd56a8",
			amount: BigNumber.from("37100000"),
		},
		{
			account: "0x7bba17234ac27d371d765386f4125bd68013e0a3",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0x24ac8bba1bfd9d73390356432fa24c8685e3e917",
			amount: BigNumber.from("641020000"),
		},
		{
			account: "0x542eb72188121f06991491b3ab56a4be4380c9d5",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xd4c64394613ae6c7b04d4d78c0019ef05d521030",
			amount: BigNumber.from("640000000"),
		},
		{
			account: "0xbf0f18033950ef50570db1cfba0ab2eb49d3b889",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xa548a3d34a8a845a89f312ece044e329ed4433e1",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x29a9d4c62f25d42c7ced2581ab77f32719c7b265",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xf5ce2be680ce281d1a8aec6fe5629909eb0adf56",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x4d42748371e4ebc32ec9a81881b012aab3351cf2",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x1e38f19ec613cfcb06d23fd71d01c9dc1feba45e",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x86220e221a3facbb2171a3ee5625005292ea053a",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xf974ff1a9282b5e21daeca731951d09c5c0304d7",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0x318a11fb434333de60b3585428cc888ea1e22c67",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x33a3f35daf0f25b15a2232f435d7e6feb6984eab",
			amount: BigNumber.from("641020000"),
		},
		{
			account: "0x4718e39351c975cfe59ec3d8bd9f3ebf6526d696",
			amount: BigNumber.from("300000000"),
		},
		{
			account: "0xd392e5d8c94bf025a0848ee82d58f947833049d2",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0xa3e1b60002a24f6cff3f74e2aa260b8c17bbdf7d",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xb04a2232ea59f903a36e3ed4b1d1c90c71dc5814",
			amount: BigNumber.from("640970000"),
		},
		{
			account: "0xf927f8b12dfc263b05e5355cded0a0008294b026",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x1138f2c7e2198d6b1d7de80377454d280f6877d1",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x750b87e9e561fbf97aae302ac88abab7b60524a7",
			amount: BigNumber.from("622980000"),
		},
		{
			account: "0xcc49a6d063ba72929600d1ed60d863a540b2565a",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x77c9f8cafc9c39f6d1aa709bce8c2fed1ce292ad",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0xc591c6592a797886650c43cd12aaaae05aafa50a",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0x9420c37bb231bbf980ab6e242ec44ed76664a3a3",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xa7bc9d8d90d0512b0cc929fcccd438f91a1d3329",
			amount: BigNumber.from("297030000"),
		},
		{
			account: "0xd5de81e7e5e4f740a26ebb254d6052e1d03b4787",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xbb8fb8fe5198f25d117c0e7b1b9c8260cb19c3c0",
			amount: BigNumber.from("641020000"),
		},
		{
			account: "0xbe967fe18a7c8aee4b858bba75ca0df2d834ef7d",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x29e3ddf94d76c97fcd43d07fc8b15a03ad233a40",
			amount: BigNumber.from("3870960000"),
		},
		{
			account: "0x25eb54fbf079e7ff9b02ee7940a4aa140d6a7dab",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x7d6461b0b1be2dcfdb55fafee085e87a1a17db6a",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xe7876f897b9cb0ccb4a319ae994d1bdc09df3e2d",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0xdea3c27f8fb7a9a4b7925874ae243493707e6745",
			amount: BigNumber.from("600000000"),
		},
		{
			account: "0x2c59900b9442b7a865f93219c04f553a0d7bd003",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xaa9aa561cb33c212ea3407385bc8b8da0318b7be",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xaad2e4507651c6d993cd1ef59f689e3a9cf48911",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x6cf51fdef74d02296017a1129086ee9c3477dc01",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x4c9e16010a557a62abdffde2e8db20a6cd79efcf",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0xde0639aa8a85cc9ea40f53f2dc2ad3f0d791b69c",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xb8c06f035f08ac8eaa4491be720cec12b765ddde",
			amount: BigNumber.from("640000000"),
		},
		{
			account: "0x26acd4e00728263222536fb903a2b85b728e3277",
			amount: BigNumber.from("640000000"),
		},
		{
			account: "0x0b381346b409a0705cb24a6d6b3a2fdef811a6b4",
			amount: BigNumber.from("641020000"),
		},
		{
			account: "0x4dce3bb119fd5785f5f40b1394fb9b3f4d78096b",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0xe55c69cfd20cfa25651c72b84383de6104104eb4",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x73dbe803ced34c0d4cf64ca9f2eff348fd365781",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x018483563379483a7c222425d4cfd7dfb21c1890",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x33ee1fa9ed670001d1740419192142931e088e79",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xcef37c72299adf1d569ef4a0ff6aabb93eaca4e2",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x1c47b2dd29e500e6535592dd617792c3118e1c1c",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xd8f60276b7d90956921ce9f2cdf73b92c8e58464",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x94d8bb9d573b66f7d212830cab060f91a322db64",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x7d81251c7e6091508967b2defc61dee86548335e",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x0160f156be6f9fa133dedf1a0340bb67ecbc41fb",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x9289fd571e3b5859c4fe47c138aa4ce81221c8c7",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xb4aca4d18c3f3ad9bfddd0a0dc8f669d51798dea",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x9d8dfe1d7cd6f1785aec71e34be7780ddcb4e0c6",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x7d95d724c44675526383ef0c69b2745e251fd58b",
			amount: BigNumber.from("640990000"),
		},
		{
			account: "0xefae15afe1d7d54e61d30ce5add8adf1c73c7ecf",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x48b486377f537e3aabd46d91bdc15efe3a838699",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0xd74fdfd5f6234372ecc93c5867217c8670c01eef",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xf2398a92af4619843a08e3c34e5a23918eb4cd5a",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0x3a66f923e59e969609cd24be579084e363cab0df",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0x0012241757b47cdf89c4f536822de83e0dda42ad",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x704e9a9ea2d23683568154ceac27e03dfa41f3bb",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0x170ccf19d1fe9f1c360a2ef0e54983f037bb0034",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xc2f1dbdd4bf23ca214c43f83001413b1a9521204",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0x167583600fa171175f1d83ef784555220c427cd7",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xbd5146380ca48552d69d256c49f5163a47b4da44",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0x4d92f9137d0e9be5efc04abc9f5cd833fa8f06dc",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xd74fdfd5f6234372ecc93c5867217c8670c01eef",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xeeec0e4927704ab3bbe5df7f4effa818b43665a3",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0xec36f0475b588a7f5c01d17c49c855f1ea6a0aaf",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0xf8ace48bb24bf0aa69799e1c128d627e35fbfc33",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x7d82a5771191bc72d3eff99e0eec60258aa07b4d",
			amount: BigNumber.from("600000000"),
		},
		{
			account: "0xac3e015877f661a9f75391b14e0107b5d995ee38",
			amount: BigNumber.from("618000000"),
		},
		{
			account: "0xa230a52119efc46cab8317f87c74c3998c0d4177",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x6b55dd9407b0f574ea31d01fdd8744bc4a71029b",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x61e56f1fb6c06cb037c5fb5e0a8bce4561dba158",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x61e56f1fb6c06cb037c5fb5e0a8bce4561dba158",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xa0d056a6865f0b212dea95dc2ddaa28883e4f62c",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x27f8602e403b6ea18f8711a7858fa4a94ef3269b",
			amount: BigNumber.from("37470000"),
		},
		{
			account: "0xe51e0d36a8dd6b8ee8ba630cd61cb96ae25508ca",
			amount: BigNumber.from("641025000"),
		},
		{
			account: "0xae3e25fc1546f2fcc0eff08b85ad43e598745d02",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xf22b2e7398971b1abeae8e7d51105b662f49b386",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x0360ac3f5785547bd3d8e5c1cf84eb9d25c44dee",
			amount: BigNumber.from("425000000"),
		},
		{
			account: "0x33326fb672959b266e085d9d464346dc609cb570",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x4c06e926a1af5e518e480eaa526ad3bd05aad504",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x89fcb042d49e520b7bf1294bbd26f065b4531b99",
			amount: BigNumber.from("36000000"),
		},
		{
			account: "0xc22874a9f53651dd83baa1c5cfcbec365ac9ef46",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0x40f8014da22296305ca1732161271e9f3a01e200",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x78c48411648d5a40e2aad63dd3a37168a0fd3844",
			amount: BigNumber.from("625430000"),
		},
		{
			account: "0xa070c820cc88017985782ce13a152a6974418d31",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x30d36fcc4010a1e16025b3dd9e0019b618994b03",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x854ce16536cc41a0593a754f88a3eaf14eee9938",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0xb302954a55a90311d9300b6563d5b6c69cf705b2",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xb8365c2810e4b0fd93d1eed4a9df0a0c0dff5d6a",
			amount: BigNumber.from("283000000"),
		},
		{
			account: "0x9c7350da2d190f60fc31b0be93f751d6674b4008",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0x236c9e509890d5fb0d1f1817af3b8e8e44561867",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0xd411a9d3909be31c9d93c519b1d343add6f52455",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0xfbe767e2fe645b73fc20d2cc67a1d88dcc462f7c",
			amount: BigNumber.from("641025000"),
		},
		{
			account: "0x767a60f295aedd958932088f9cd6a4951d8739b6",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x1798616ecec2e605e542f79243704a9ee46ab252",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0x99280a41b62af851e8e4864325e036ed488eaf7e",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0xbd33ef95fa6bd6dab8bbdce810092319d27078f7",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x97e7e1c777e4f55cf1320110e62db865252f1e50",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x31e4022ee3fc9d3b43c1905664a58c98cc382a12",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x5d4bedb7c12b37815e0e011da1cc14a3f80b7d63",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0xbcf485f6763810763f1c113a6127c4a5b7be30db",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x5f0f73143b2eb8c4c124f0eefbaf2b69f9dd0a18",
			amount: BigNumber.from("37000000"),
		},
		{
			account: "0xde6440ec7681a70ab224e072fc36cb5b20069512",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0x5a1b8d6a57445deced8f816310fdb0aa6367cf10",
			amount: BigNumber.from("283000000"),
		},
		{
			account: "0x2719f75f3734475a0157e1257c12596b8ac2d1e5",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x0c7cdee7f65f2be9d3d241a8caf43fd2773e263b",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0x3890c6b13de444029c30621e911f0d5b2361810b",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x6b0849c736e813863d96431c9ea1168c5ba18c5c",
			amount: BigNumber.from("500000000"),
		},
		{
			account: "0xcce853ecb829d914d119724761e3deb6ad982047",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x8df5f70ba13a793f96b90c27aad672cae1c2403e",
			amount: BigNumber.from("283018860"),
		},
		{
			account: "0xaf1273fb4e8222bd2fd0442ebd45ede0da90530a",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x6c3855238a72cb6a8eebf3f04465c967daba9901",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0x3e616a40b9bb93afa117af08a5d151a44b5700db",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x2b9a28d252ce8912cc2ad18debbfd26c65b192b0",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xe72e9fb386c922125d33ce1bb62e3019bc060e3d",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xc01812c675e56d5d171d589721429e471c858e54",
			amount: BigNumber.from("641025000"),
		},
		{
			account: "0x3463db771e99822f26dcf57cefdacca3301c34d5",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x1a0f3b5e6a376877f63e830805e6ca7ee2af1ba4",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xabdfe5b8d8393f4c4a73c0dab4be7db9755393a0",
			amount: BigNumber.from("615000000"),
		},
		{
			account: "0x147c90dad8e33ae3e916aa3ca779d56aa3ae129e",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0x6232d7a6085d0ab8f885292078eeb723064a376b",
			amount: BigNumber.from("37000000"),
		},
		{
			account: "0xa3e9365d44baf9a07f9244102437a5e7a8ef30a7",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x070213e2afd44154873f2a481caa65095e31b78a",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xb7b3a3965ae46cbc437e1e2d283e8edea636408c",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x0385ea655a8f917cdae5be043df8928ddc00dd7d",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0x8887eeea16eae40bc7e5be88df0cd1474c4ecf18",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0xfd4ea5ec9ca35e1c7269f473ba14d6e73079d8d5",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xc267422835a1d3ebd99c835de5d638487dd94124",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xd40bcb50b2099fc59231d4a19f61cc29b4a35301",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0xc7b169b108c5e75991c520aea97140534291c81d",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x310887591bb3a7f4ace07ed837484d5dcead9bbb",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0x5deff2dd53411ef8401241d3217c17982b0bf208",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x2296dbda818e04b5d6c68f3ad317935ff036a169",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x5665785813011a5c37c10972f8d3d463441637c3",
			amount: BigNumber.from("641025000"),
		},
		{
			account: "0x12ebae87933ba8731d50e2d6fd47629672122874",
			amount: BigNumber.from("610000000"),
		},
		{
			account: "0xe455bc60f4940b1b8cc72a98d8de77a21fb5d72c",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x9b1ac8e6d08053c55713d9aa8fde1c53e9a929e2",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x4e543ab23eb7e96253bbec2559f63ed2f4185e07",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0x4286609dad445c5c33170c942f6e0ed6c56784be",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xbac8424b1d910528ba0381947f864cafaef7d0ff",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0x1aa9a98ff4c794ce15d1d699311934da8b7d1b03",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0xd976d3cc17d109889037175b2472af6ca970302d",
			amount: BigNumber.from("601000000"),
		},
		{
			account: "0x1334fdd8ae0694168785aca024768f1d99b65ff9",
			amount: BigNumber.from("640000000"),
		},
		{
			account: "0xcbc4c1253254986c284091c1c27a45e81d7a4039",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0x43c050e7fefe69b5713000fc3eb9cc2d61579251",
			amount: BigNumber.from("283000000"),
		},
		{
			account: "0xb5413e7a5027e7632746ed598dcabf5fd1e4de6f",
			amount: BigNumber.from("283010000"),
		},
		{
			account: "0x9506e7bafa7267c7c488f73782181438a16a023d",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0x03f9bb84628bd284686819a5ba7ab5c0193145e6",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0xaca74804b502aa36b38d4b515fe021588b5b9ef2",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xabb280fd8c7c72eac3aec3d0268d2a4582e14678",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0x2e99af4277d9fe7355291e6f90fb5a4f82f27696",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0x9e93e5a06f8035700d0a9d66d04d6c3c3cd0c66b",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0xfdaed79ab8411f6317f678783a473cbc6972821a",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x4b71dd8f15407bb30f868fb0d2a764d7f0e62334",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xc741c890cceeb4629a55d4a136dff6d87620705f",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xff2497842cb0e63353563dde7795f463ced150f4",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xf1f3417e1194e7ac68f95e153de0ae18c6204bf8",
			amount: BigNumber.from("630000000"),
		},
		{
			account: "0xab930e565cad29ece7d143fc81ab876c68088fdd",
			amount: BigNumber.from("641020000"),
		},
		{
			account: "0xfa2788d0368b1f8a1e1a0674758755319d9cb62c",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0x722e895a12d2a11be99ed69dbc1fedbb9f3cd8fe",
			amount: BigNumber.from("280000000"),
		},
		{
			account: "0x10485fe2f23afaa8a85eef091b7233a600463c52",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0xc7297faf6988c58a789c9d4c0e9219ce452c601a",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0xdede79c2cde2586231d533b28d49c895395a6a4e",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x33d58f6ded18b0faefa7d407786418b36b31ca09",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0xe2147d5cc55d5246bb5e4ee94cea78d3c1d3f6c8",
			amount: BigNumber.from("37450000"),
		},
		{
			account: "0x18f771e2feccd60aa178a2db8ff9d101c3f412fb",
			amount: BigNumber.from("612840000"),
		},
		{
			account: "0x67886680ec214b2754e8eb76ae729045e7296d40",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0xfc924a37cc8548bb2000036017971ae3dd40b176",
			amount: BigNumber.from("641020000"),
		},
		{
			account: "0x3e37400c48be12d0a2d73ee7489f5ca063a897bd",
			amount: BigNumber.from("750000000"),
		},
		{
			account: "0xc5792957a26c7e917f09b84c665ff4400f251c28",
			amount: BigNumber.from("641020000"),
		},
		{
			account: "0x9f5141e8715c6691e75188bda726df54c14721e4",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xec44f39ad8862bdbed64cc95372d208a1db385d3",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xc841955f0d4f80ac91ec2ae34bf3b0024458a1aa",
			amount: BigNumber.from("640000000"),
		},
		{
			account: "0xa09110caf0e83be6ad5416d3c23a496ba53f6aff",
			amount: BigNumber.from("640995641"),
		},
		{
			account: "0xe3b9878690b92166cf4ab71e6935bb4ecb1ee83a",
			amount: BigNumber.from("623980000"),
		},
		{
			account: "0xc92cb01bcfb8717bcbcd91748a4c75634181e9a6",
			amount: BigNumber.from("641020000"),
		},
		{
			account: "0xe5c80a7963c0d8f4ab9c0bb8d854e47594cf9394",
			amount: BigNumber.from("1848000000"),
		},
		{
			account: "0xb319d8f7e603c372d0135c145dd8b0ab77c02aee",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0x7693c3545667309f112eb2d1a0d7bdfcfc536411",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xdb75ae62eec74e21d193ad27713c703a9bc84ead",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x0d3be9d260cfe19042d6b7d89fe860c802929e74",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xdffd8bbf8dcaf236c4e009ff6013bfc98407b6c0",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x9c164a0ece303a922b466548bfb95d725c20c425",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xa348a19970cf59a7d762010fa84c938ecb4f37ae",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x4519f0b6d70efab9b348c6dd4a79ebfbd5df1231",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x9e8c8050df2dfe5ecbf5e9ff3eb67a7f17400715",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xa8fdb82cefeeecb3406be7c6ee39d86a9fd0273f",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xad192a9eaee1e342cabb1cd32f01de3b77d8598f",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xbe906eada120501caa443d039ab49f84e39e2508",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x1adf4ba7111100b7a7bfd82783d82cd42823b1e8",
			amount: BigNumber.from("390029000"),
		},
		{
			account: "0xb3ef281e6a654be7a0c539aad2a9b6e3da1ece53",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0x4deba5d346229a946dca0b6be8aac2675bcc9f3e",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xadbcc370f713bd0fe7295277a76cb8d9183a2218",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xde4b26e8e226cccd6be89af396e22860baf69d64",
			amount: BigNumber.from("641020000"),
		},
		{
			account: "0x0c55b13cec1df9a2acac90d16e80105fc3207344",
			amount: BigNumber.from("641025000"),
		},
		{
			account: "0x27b17839f9aff43f823a2881c82cdd2e8b284d50",
			amount: BigNumber.from("642000000"),
		},
		{
			account: "0xf6c0a0e00ea37610a044690cdf071d80d15678b1",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0xb22798d2a671b0291326af3feb42bab12c8fbde9",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0x7245799eb321859496d8d5cd8ec0b866d0539c96",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x2294640e39cd6af63507f6bcd41f02e5d0075944",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x79ad7dc6c3e068cc0160dd4dfec801b5ab170bf7",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xcd904867d3feceb790142cc031c4d1f5c5cf237c",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xa6011766d4733c8eb7a5e3817a56371b9ca08fc3",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x434c824eacba0f68614206f2c87ffb64871aac13",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xa5f2f3c7fd7e76b142a5f8acf1464fd38f0c5186",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xbce537e0b45c50791d3be159b3375b866845e6b9",
			amount: BigNumber.from("1471800000"),
		},
		{
			account: "0x89b748c5bd860ce93325f8cc4a951a965f40999b",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x51b2adf97650a8d732380f2d04f5922d740122e3",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x20c08fed30d852e50670cbe77b85ac8d8e5239b4",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0x269a7d29c02f8426347dedbd3d632f15f7d0b9e8",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xdc4d0cdc570c4edcd16adbe883975182619f4f31",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x8c67005d51e9c8c9bbb32ff0724f2dfda7970652",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x384227e2865ad039a241b4febf355a48bb0c65b0",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0xae1508780f7ab83c91e5e81e06c22de34f0af54f",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0x384227e2865ad039a241b4febf355a48bb0c65b0",
			amount: BigNumber.from("641025641"),
		},
		{
			account: "0x8f9b5f6f6c4f4cd382fb3b491d5c14aebccd45c5",
			amount: BigNumber.from("80000000"),
		},
		{
			account: "0xf119655322fbd62f5340333034d85819ec1e32db",
			amount: BigNumber.from("600000000"),
		},
		{
			account: "0x8d3a67337c180d66448c314816036723047b38f8",
			amount: BigNumber.from("641000000"),
		},
		{
			account: "0x1e7127c81c8a58661a0811f026b6be66533934be",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x9d196a5da6181920a3ed2ec046d8f73ea72bcb91",
			amount: BigNumber.from("641020000"),
		},
		{
			account: "0xc4eac2351631fdb9c107563d6d425fdf5ddcb66f",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xcf41142ad633435b6d74ee9f969a6a7b122822f2",
			amount: BigNumber.from("618570000"),
		},
		{
			account: "0xb4a537532569606c628801fb863b1aa9aae3fbb7",
			amount: BigNumber.from("450000000"),
		},
		{
			account: "0x97852657d38e6d4f4ba79c70ad6961bc384cba7e",
			amount: BigNumber.from("640000000"),
		},
		{
			account: "0x0de7cf1d113ceb2b4cb78ef3eeb3a20a8e30b9a5",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x725a41449ba3307099d47bcd475ff87bd34e0f75",
			amount: BigNumber.from("640000000"),
		},
		{
			account: "0xb248a284756a52c7ec5fb119648747128c1ec28b",
			amount: BigNumber.from("635100000"),
		},
		{
			account: "0x7b8778b5abc248acc2d9ee3e4679ff72c0fcbe32",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0xe5252fe49579cd081c8bf1b8e8de5040549e827b",
			amount: BigNumber.from("37500000"),
		},
		{
			account: "0x4e2a7d0e465d8d38aa5a1852d438e60b5832c1b4",
			amount: BigNumber.from("642000000"),
		},
		{
			account: "0xd4f9fe0039da59e6ddb21bbb6e84e0c9e83d73ed",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x4df0df2d3780a192e4ee87cce6156c562904e940",
			amount: BigNumber.from("642000000"),
		},
		{
			account: "0x1936c9c3ff5835fa74e0c48906ddd9fda589ba81",
			amount: BigNumber.from("1485000000"),
		},
		{
			account: "0x25daa8f271cb9477a710c67015e509039ebca749",
			amount: BigNumber.from("642000000"),
		},
		{
			account: "0x2802739f8146ca1b7bbaabe5d1085a057bc4678f",
			amount: BigNumber.from("642000000"),
		},
	],
}

async function main() {
	var userinput: string = "0"

	userinput = readline.question(
		addColor(
			Colors.yellow,
			`\nYou are about to deploy on the mainnet, is it fine? [y/N]\n`
		)
	)

	if (userinput.toLowerCase() !== "y") {
		colorLog(Colors.blue, `User cancelled the deployment!\n`)
		return
	}

	colorLog(Colors.green, `User approved the deployment\n`)

	await new Deployer(config).run()
}

main().catch(error => {
	console.error(error)
	process.exitCode = 1
})
