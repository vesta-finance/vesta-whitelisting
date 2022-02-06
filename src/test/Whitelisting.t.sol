pragma solidity ^0.8.11;

import "./base/BaseTest.sol";
import "./utils/Accounts.sol";
import "./utils/console.sol";
import "./mock/ERC20Mock.sol";

import "src/main/Whitelisting.sol";
import "src/main/interfaces/IVestingVsta.sol";

contract WhitelistingTest is BaseTest {
	bytes private constant INVALID_ERC20 = "Invalid erc20";
	bytes private constant INVALID_LOCKED_VSTA = "Invalid LockedVsta Contract";
	bytes private constant INVALID_TOKEN_PRICE = "Invalid token price";
	bytes private constant INVALID_TOTAL_SUPPLY = "Invalid total supply";
	bytes private constant INVALID_ROOT = "Invalid MarkleRoot";
	bytes private constant INVALID_PROOF = "MerkleDistributor: Invalid proof.";

	Accounts private accounts = new Accounts(vm);

	ERC20Mock private mockERC20 = new ERC20Mock();
	LockedVstaMock private lockedVstaMock = new LockedVstaMock(mockERC20);
	Whitelisting private underTest;

	event Claimed(address account, uint256 amountVsta);

	bytes32 private constant root =
		0x869d781e49e8f9ebbb9e9b87d17e1a13cdab1ef438771d7d7151f62501addb67;

	uint256 private constant TOKEN_PRICE = 8e17;
	uint256 private constant TOTAL_SUPPLY = 790454 * 1 ether;
	uint256 private constant USDC_PER_USER = 100 ether;

	address private owner;

	uint256 private constant WALLET_0_USDC = 1 * 1e5; //0.1
	uint256 private constant WALLET_1_USDC = 100 * 1e6;
	uint256 private constant WALLET_2_USDC = 200 * 1e6;
	uint256 private constant WALLET_3_USDC = 300 * 1e6;

	function setUp() public {
		owner = accounts.PUBLIC_KEYS(0);
		vm.startPrank(owner);
		underTest = new Whitelisting();

		mockERC20.mint(owner, TOTAL_SUPPLY);
		mockERC20.approve(address(underTest), TOTAL_SUPPLY);
		underTest.setAddresses(
			mockERC20,
			address(lockedVstaMock),
			TOKEN_PRICE,
			TOTAL_SUPPLY,
			root
		);

		vm.stopPrank();
	}

	function usdcToToken(uint256 _usdcAmount) private view returns (uint256) {
		return (underTest.covertToEther(_usdcAmount) / TOKEN_PRICE) * 1 ether;
	}

	function test_whenSetAddresses_asUser_ThenReverts() public {
		vm.prank(accounts.PUBLIC_KEYS(1));
		vm.expectRevert(NOT_OWNER);
		underTest.setAddresses(
			mockERC20,
			address(lockedVstaMock),
			TOKEN_PRICE,
			TOTAL_SUPPLY,
			root
		);
	}

	function test_whenSetAddresses_asOwner_ApproveVestingContract() public {
		vm.prank(accounts.PUBLIC_KEYS(1));
		vm.expectRevert(NOT_OWNER);
		underTest.setAddresses(
			mockERC20,
			address(lockedVstaMock),
			TOKEN_PRICE,
			TOTAL_SUPPLY,
			root
		);

		assertEq(
			mockERC20.allowance(address(underTest), address(lockedVstaMock)),
			type(uint256).max
		);
	}

	function test_whenSetAddresses_asOwner_InvalidParameters_ThenReverts()
		public
	{
		vm.startPrank(owner);
		mockERC20 = new ERC20Mock();
		underTest = new Whitelisting();

		vm.expectRevert(INVALID_ERC20); // Erc20 total supply is 0 -> fails
		underTest.setAddresses(
			mockERC20,
			address(lockedVstaMock),
			TOKEN_PRICE,
			TOTAL_SUPPLY,
			root
		);

		mockERC20.mint(owner, TOTAL_SUPPLY - 1);
		mockERC20.approve(address(underTest), TOTAL_SUPPLY);

		vm.expectRevert(ERC20_INVALID_BALANCE);
		underTest.setAddresses(
			mockERC20,
			address(lockedVstaMock),
			TOKEN_PRICE,
			TOTAL_SUPPLY,
			root
		);

		mockERC20.mint(owner, 1);

		vm.expectRevert(INVALID_LOCKED_VSTA);
		underTest.setAddresses(
			mockERC20,
			address(0),
			TOKEN_PRICE,
			TOTAL_SUPPLY,
			root
		);

		vm.expectRevert(INVALID_TOKEN_PRICE);
		underTest.setAddresses(
			mockERC20,
			address(lockedVstaMock),
			0,
			TOTAL_SUPPLY,
			root
		);

		vm.expectRevert(INVALID_TOTAL_SUPPLY);
		underTest.setAddresses(
			mockERC20,
			address(lockedVstaMock),
			TOKEN_PRICE,
			0 ether,
			root
		);

		vm.expectRevert(INVALID_ROOT);
		underTest.setAddresses(
			mockERC20,
			address(lockedVstaMock),
			TOKEN_PRICE,
			TOTAL_SUPPLY,
			bytes32(0)
		);

		vm.stopPrank();
	}

	function test_claim_asNonWhitelistedUser_WithValidProof_ThenReverts() public {
		address caller = address(mockERC20);

		vm.prank(caller);
		vm.expectRevert(INVALID_PROOF);
		underTest.claim(WALLET_1_USDC, PROOF_01);
		assertEq(mockERC20.balanceOf(caller), 0);
	}

	function test_claim_asWhitelistedUser_WithValidProof_NoRoot_ThenReverts()
		public
	{
		address caller = accounts.PUBLIC_KEYS(1);
		vm.prank(caller);
		underTest = new Whitelisting();

		vm.expectRevert(INVALID_PROOF);
		underTest.claim(WALLET_1_USDC, PROOF_01);
		assertEq(mockERC20.balanceOf(caller), 0);
	}

	function test_claim_asWhitelistedUser_WithValidProof_ThenSendsAndLocksTokens()
		public
	{
		address caller = accounts.PUBLIC_KEYS(1);
		vm.startPrank(caller);

		vm.expectCall(
			address(lockedVstaMock),
			abi.encodeWithSelector(
				lockedVstaMock.addEntityVesting.selector,
				caller,
				0,
				usdcToToken(WALLET_1_USDC) / 2
			)
		);

		underTest.claim(WALLET_1_USDC, PROOF_01);

		assertEq(mockERC20.balanceOf(caller), usdcToToken(WALLET_1_USDC) / 2);
		vm.stopPrank();
	}

	function test_claim_asWhitelistedUser_tryToClaimTwice_ThenReverts() public {
		address caller = accounts.PUBLIC_KEYS(1);
		vm.startPrank(caller);

		underTest.claim(WALLET_1_USDC, PROOF_01);

		vm.expectRevert("Already claimed!");
		underTest.claim(WALLET_1_USDC, PROOF_01);

		vm.stopPrank();
	}

	function test_claim_asWhitelistedUsers_WithValidProof_ThenSucceeds() public {
		vm.prank(accounts.PUBLIC_KEYS(0));
		underTest.claim(WALLET_0_USDC, PROOF_00);
		vm.prank(accounts.PUBLIC_KEYS(1));
		underTest.claim(WALLET_1_USDC, PROOF_01);
		vm.prank(accounts.PUBLIC_KEYS(2));
		underTest.claim(WALLET_2_USDC, PROOF_02);
		vm.prank(accounts.PUBLIC_KEYS(3));
		underTest.claim(WALLET_3_USDC, PROOF_03);

		assertEq(
			mockERC20.balanceOf(accounts.PUBLIC_KEYS(0)),
			usdcToToken(WALLET_0_USDC) / 2
		);
		assertEq(
			mockERC20.balanceOf(accounts.PUBLIC_KEYS(1)),
			usdcToToken(WALLET_1_USDC) / 2
		);
		assertEq(
			mockERC20.balanceOf(accounts.PUBLIC_KEYS(2)),
			usdcToToken(WALLET_2_USDC) / 2
		);
		assertEq(
			mockERC20.balanceOf(accounts.PUBLIC_KEYS(3)),
			usdcToToken(WALLET_3_USDC) / 2
		);
	}

	//USDC : 0.1
	bytes32[] PROOF_00 = [
		bytes32(0xbb514bbce6cf1c9adf8ee8e7df9e10f4a684bde09dab66c1f3cd8054fdfdf1c1),
		bytes32(0x919c23b3134cb3a463669387af0b871a37a5a5efca76b11f0041a26b87ad54fd),
		bytes32(0xe22edcf3e0618beea9ae8601b7994ac561e55b0e3001340d436b7bcf35580fab),
		bytes32(0xe024195bd61387384bdd47e1225abf833c070def4f41ff7bb2f2add7bfc694f2),
		bytes32(0x6789e723a59ed9f8b152ce2f7d7d248d2a27b29dfaad36c7b441d1d4550e7ee8),
		bytes32(0xdbb3b9ad642583c07226c73fc6c06311d134d7a8484af0101835c6b91484d2ec),
		bytes32(0xa414844e7aec8d5cc72f84cb7dd556cc0e4aaf97c33de748d2cb40b53924a3c0),
		bytes32(0x36d96375ce46cfd107f0654852cbee054e09003b5895f7e38d39cff5735c11a8),
		bytes32(0x64055f2fa02b12c3711223c00acedda9fd944c7dd3dead057076f85928265843)
	];

	//USDC : 100
	bytes32[] PROOF_01 = [
		bytes32(0x0632ca6f07f63d3cfde83910b3f6b8a4aa6e31c2400ba10adf97ac9e948b2662),
		bytes32(0x10c0ac1c236adfc633e9ddfc29302bc9cc12aac80e556feb7e9ce844bd1b7fc8),
		bytes32(0x673d5fd0c434ab1b2e469d50b294b50fdf42612b206a8afed0b5c8f8bb0d24b2),
		bytes32(0x83ca9e5c8b583b1d5d6bcdada65507b7102292b64f9d535e2281339aff46c1b6),
		bytes32(0xc8042dbe837760c289b86b7f18346b2f78329c5f18a744dfdb0eb24ce57b1d5c),
		bytes32(0x40b7f0dcd840a54317c4d6b805f7c7b511156c18e036e2c499c3ecf3b5d345e8),
		bytes32(0xb268690fe534db9a7715390db9734a6ae0fe560877a86481c9156781c12e7a72),
		bytes32(0xb0f85fb5aba36a7dfeae0572bbde08f4ef8687bd0b0b37174c33a8db34a88cce),
		bytes32(0x289add406a91ddc405c1bf055d1f707507cfcc7ef138dc8b592f6addf6df3568)
	];

	//USDC : 200
	bytes32[] PROOF_02 = [
		bytes32(0x0b051e8a5ffaa335032eaba2698bac451b45b7e1c8a16dcf1fdd6697b209c04b),
		bytes32(0x78fcff4943a473732f50774ff594560c3cb7642229c63773d3b9ac8163540709),
		bytes32(0x20a5e764bcd4be45690749a07ef8d7623ee5f11bbad816d4c1eefc07a36ac2ff),
		bytes32(0x92fc4049b39d814c4492e0c826392ed0868bf07d2b7f818e3c459219d731476a),
		bytes32(0x24fcab3ba1e6018c5879a7d062d105cd224a962223fcb152599a1b38964263e8),
		bytes32(0x40b7f0dcd840a54317c4d6b805f7c7b511156c18e036e2c499c3ecf3b5d345e8),
		bytes32(0xb268690fe534db9a7715390db9734a6ae0fe560877a86481c9156781c12e7a72),
		bytes32(0xb0f85fb5aba36a7dfeae0572bbde08f4ef8687bd0b0b37174c33a8db34a88cce),
		bytes32(0x289add406a91ddc405c1bf055d1f707507cfcc7ef138dc8b592f6addf6df3568)
	];

	//USDC : 300
	bytes32[] PROOF_03 = [
		bytes32(0x73f1186410bf3c78cd60abd3929e15e0cd9ad3e23119d6344df83c1fe56005a2),
		bytes32(0x58cbbd63d670f076bc7cf794bd5a89bc44c0f8ebefbbf51a667e7bc175165f2f),
		bytes32(0xa5806f6a37b5e53d76c77d12dfd3023bcaee48611cc10c07dd03dff52fd44a62),
		bytes32(0xd3f3b82e30cdf334dad96748575b60e43fb629052d8c777807095bb50cdd103a),
		bytes32(0xa20aefd20cb10e8968bc87b71403824b51e6497c4e821c2345dbba86740e5169),
		bytes32(0x6373c8da5459a6477b20c3c97dee5502b9435f85b984a4997ba5d2353039e46c),
		bytes32(0x9b8381db1fe63f4fe3a5e9f4436281d3d7ac9f50837fed0689108ac9897491e8),
		bytes32(0xc42adb22f288efbd1ab4242d762f4bdc4d60acd4ebb218989952b5915b81802a),
		bytes32(0x289add406a91ddc405c1bf055d1f707507cfcc7ef138dc8b592f6addf6df3568)
	];

	//USDC : 400
	bytes32[] PROOF_04 = [
		bytes32(0xc2c21c3ff311dba6325d1e1c95b30635b90e6d2be7f2143a17888d4d87b2dddb),
		bytes32(0x42a7547cf8d50eb5059740b60e2cc37882fda3c09dd82cb5c837d705f452e36c),
		bytes32(0x9d2a5f022c10b95d68f9cc3a52cdef11e4a22ad367db1335dbc6f47cc6069c9d),
		bytes32(0x8c669da92dc6b53da29cf2444f3a54e7cbe69fd3fdd8c80192dfe2ac162a2eff),
		bytes32(0x2e06d86876c28cf9d0bcfe2dae569b120ef18bc2875b2e34722008a9086f39f5),
		bytes32(0xdbb3b9ad642583c07226c73fc6c06311d134d7a8484af0101835c6b91484d2ec),
		bytes32(0xa414844e7aec8d5cc72f84cb7dd556cc0e4aaf97c33de748d2cb40b53924a3c0),
		bytes32(0x36d96375ce46cfd107f0654852cbee054e09003b5895f7e38d39cff5735c11a8),
		bytes32(0x64055f2fa02b12c3711223c00acedda9fd944c7dd3dead057076f85928265843)
	];
}

contract LockedVstaMock {
	IERC20 token;

	constructor(IERC20 _token) {
		token = _token;
	}

	function addEntityVesting(
		address _entity,
		uint256 _vestingType,
		uint256 _totalSupply
	) external {
		token.transferFrom(msg.sender, address(this), _totalSupply);
	}
}
