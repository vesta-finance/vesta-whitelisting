pragma solidity ^0.8.11;

import "./base/BaseTest.sol";
import "./utils/Accounts.sol";
import "./utils/console.sol";
import "./mock/ERC20Mock.sol";

import "src/main/Whitelisting.sol";
import "src/main/libs/ILockedVsta.sol";

contract WhitelistingTest is BaseTest {
	bytes private constant INVALID_ERC20 = "Invalid erc20";
	bytes private constant INVALID_LOCKED_VSTA = "Invalid LockedVsta Contract";
	bytes private constant INVALID_TOKEN_PRICE = "Invalid token price";
	bytes private constant INVALID_TOTAL_SUPPLY = "Invalid total supply";
	bytes private constant INVALID_ROOT = "Invalid MarkleRoot";
	bytes private constant INVALID_PROOF = "MerkleDistributor: Invalid proof.";

	Accounts private accounts = new Accounts(vm);

	ERC20Mock private mockERC20 = new ERC20Mock();
	ILockedVsta private lockedVstaMock = new LockedVstaMock();
	Whitelisting private underTest;

	event Claimed(address account, uint256 amountVsta);

	bytes32 private constant root =
		0x09102ab8706e73a6c3fdb1e2b8f22e54cecc113ba7bf5dd6951c5df94c4590f5;

	uint256 private constant TOKEN_PRICE = 8e17;

	uint256 private constant TOTAL_SUPPLY = 100 * 100 ether;
	uint256 private constant USDC_PER_USER = 100 ether;
	uint256 private constant USER_CLAIM_AMOUNT =
		((100 ether / TOKEN_PRICE) * 1 ether) / 2;

	address private owner;

	function setUp() public {
		owner = accounts.PUBLIC_KEYS(0);
		vm.startPrank(owner);
		underTest = new Whitelisting();

		mockERC20.mint(owner, TOTAL_SUPPLY);
		mockERC20.approve(address(underTest), TOTAL_SUPPLY);
		underTest.setAddresses(
			mockERC20,
			lockedVstaMock,
			TOKEN_PRICE,
			TOTAL_SUPPLY,
			root
		);

		vm.stopPrank();
	}

	function test_whenSetAddresses_asUser_ThenReverts() public {
		vm.prank(accounts.PUBLIC_KEYS(1));
		vm.expectRevert(NOT_OWNER);
		underTest.setAddresses(
			mockERC20,
			lockedVstaMock,
			TOKEN_PRICE,
			TOTAL_SUPPLY,
			root
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
			lockedVstaMock,
			TOKEN_PRICE,
			TOTAL_SUPPLY,
			root
		);

		mockERC20.mint(owner, TOTAL_SUPPLY - 1);
		mockERC20.approve(address(underTest), TOTAL_SUPPLY);

		vm.expectRevert(ERC20_INVALID_BALANCE);
		underTest.setAddresses(
			mockERC20,
			lockedVstaMock,
			TOKEN_PRICE,
			TOTAL_SUPPLY,
			root
		);

		mockERC20.mint(owner, 1);

		vm.expectRevert(INVALID_LOCKED_VSTA);
		underTest.setAddresses(
			mockERC20,
			ILockedVsta(address(0)),
			TOKEN_PRICE,
			TOTAL_SUPPLY,
			root
		);

		vm.expectRevert(INVALID_TOKEN_PRICE);
		underTest.setAddresses(mockERC20, lockedVstaMock, 0, TOTAL_SUPPLY, root);

		vm.expectRevert(INVALID_TOTAL_SUPPLY);
		underTest.setAddresses(
			mockERC20,
			lockedVstaMock,
			TOKEN_PRICE,
			0 ether,
			root
		);

		vm.expectRevert(INVALID_ROOT);
		underTest.setAddresses(
			mockERC20,
			lockedVstaMock,
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
		underTest.claim(1, USER_CLAIM_AMOUNT, PROOF_01);
		assertEq(mockERC20.balanceOf(caller), 0);
	}

	function test_claim_asWhitelistedUser_WithValidProof_NoRoot_ThenReverts()
		public
	{
		address caller = accounts.PUBLIC_KEYS(1);
		vm.prank(caller);
		underTest = new Whitelisting();

		vm.expectRevert(INVALID_PROOF);
		underTest.claim(1, USER_CLAIM_AMOUNT, PROOF_01);
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
				USER_CLAIM_AMOUNT
			)
		);

		underTest.claim(1, USDC_PER_USER, PROOF_01);
		assertEq(mockERC20.balanceOf(caller), USER_CLAIM_AMOUNT);
		vm.stopPrank();
	}

	function test_claim_asWhitelistedUsers_WithValidProof_ThenSucceeds() public {
		vm.prank(accounts.PUBLIC_KEYS(0));
		underTest.claim(0, USDC_PER_USER, PROOF_00);
		vm.prank(accounts.PUBLIC_KEYS(1));
		underTest.claim(1, USDC_PER_USER, PROOF_01);
		vm.prank(accounts.PUBLIC_KEYS(2));
		underTest.claim(2, USDC_PER_USER, PROOF_02);
		vm.prank(accounts.PUBLIC_KEYS(3));
		underTest.claim(3, USDC_PER_USER, PROOF_03);

		assertEq(mockERC20.balanceOf(accounts.PUBLIC_KEYS(0)), USER_CLAIM_AMOUNT);
		assertEq(mockERC20.balanceOf(accounts.PUBLIC_KEYS(1)), USER_CLAIM_AMOUNT);
		assertEq(mockERC20.balanceOf(accounts.PUBLIC_KEYS(2)), USER_CLAIM_AMOUNT);
		assertEq(mockERC20.balanceOf(accounts.PUBLIC_KEYS(3)), USER_CLAIM_AMOUNT);
	}

	bytes32[] PROOF_00 = [
		bytes32(0xad54cdbcb4d4e2c3bd0ff093d13cd5687deee039bed90b8c15803a0c1d3817a2),
		bytes32(0x78ac19068a4608534677f91f05c2a2caff00a50da597ec2c073372fed22ad10e),
		bytes32(0x45ed4de96f768238e4c8dc53e4c7a5f89bd0106105c7d61cc6c550a44f60728b),
		bytes32(0x2493252c96f1f93fbdebfc1688cdf8ba8e74a62ea9849f0f7fc6b5a2345a53df),
		bytes32(0xed1c7fbee3d08e942c15eb50aa24f94de1624ba02ac12749fbbfc8a04da3580d),
		bytes32(0x240d0a5ea1a010c47184878535d12fba1c6d95a1eadde4c418ebf89ec904a8c4),
		bytes32(0x6876e3a5a5bdce257559759e9c2e5029c19f013d903d3b0a38c93851402d8a57)
	];

	bytes32[] PROOF_01 = [
		bytes32(0x908aefc8ba7eb207eac5df5290b15fccfc3dcb3d6a78d35221237ea3bba02ac3),
		bytes32(0x609d2cc11d324a427c5ba6376af964ae278c84fda1645e3a70e01fee9141e7f2),
		bytes32(0x112aeb904f5a994f36d89d04bad48623602d45010e8af620957203819496861f),
		bytes32(0xea3b591bc529d320ecbe4075b316ea064ac4780ff091c86805b14410de2993d6),
		bytes32(0xb8a044bdbb78fd495ce7669e7a07a6556dba4c0f479a700562fb503f5b5d9513),
		bytes32(0xfa06bad4c4bb8f0869bc07016e0285a6fbd28c6a700feece9136a256669f5002),
		bytes32(0x9aa7b5307f7c855f7ddd22ae113b5dcae3a79daf5d5bd6f4993c7cac2dc330ac)
	];

	bytes32[] PROOF_02 = [
		bytes32(0x37308acfcef3fb5a0753ec7463d53fa22ac1e4b6792f57434cc050b554099fe5),
		bytes32(0xa25fb1a258613a3da93f74b820820af93622c64ebae4aae6b939fab6ea132b23),
		bytes32(0x89e650dbe9a1fc2b80eeb7291d3c4d68a524d62340f5dc4f14774666c8b99edc),
		bytes32(0xb9a10c6a00e9c35e44ea0d2f64f6be80d97eaf650b8ba712ad8a96de4b038c21),
		bytes32(0xf75705d08582bd2f66c89eaccacd49aa6537cb779a8160cb787ca508e0803835),
		bytes32(0x913729085d5d9c420436dde45e6201c7b9a42b9e32eafd907637b9b99ead5790),
		bytes32(0x9aa7b5307f7c855f7ddd22ae113b5dcae3a79daf5d5bd6f4993c7cac2dc330ac)
	];

	bytes32[] PROOF_03 = [
		bytes32(0xbf3cf8c30850445084fff31c4491f8a35894eb30d1fb668e287c243ee3aa8e8c),
		bytes32(0x1576b7116306c4de2c968319fb83b2bfbc0b6998b9507eac58af2aa9701ec66e),
		bytes32(0xce7f68839a4395e3bb80f3ace7966ef014c37b3348c5a33a140c4b7c84de3cb1),
		bytes32(0x5a091503dff9c70ace84f9c0aea9bacf9b53412a7628a62a10eac7a041909418),
		bytes32(0xed1c7fbee3d08e942c15eb50aa24f94de1624ba02ac12749fbbfc8a04da3580d),
		bytes32(0x240d0a5ea1a010c47184878535d12fba1c6d95a1eadde4c418ebf89ec904a8c4),
		bytes32(0x6876e3a5a5bdce257559759e9c2e5029c19f013d903d3b0a38c93851402d8a57)
	];
}

contract LockedVstaMock is ILockedVsta {
	function addEntityVesting(address _entity, uint256 _totalSupply)
		external
		override
	{}
}
