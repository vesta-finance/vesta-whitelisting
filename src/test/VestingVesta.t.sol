pragma solidity ^0.8.11;

import "./base/BaseTest.sol";
import "./utils/Accounts.sol";
import "./utils/console.sol";
import "./mock/ERC20Mock.sol";

import "src/main/VestingVesta.sol";

contract VestingVestaTest is BaseTest {
	Accounts private accounts = new Accounts(vm);

	bytes private constant NoPermission = hex"9d7b369d";
	bytes private constant InvalidAddress = hex"e6c4247b";
	bytes private constant ClaimingLockHigherThanVestingLock = hex"ccd27a2f";
	bytes private constant DuplicatedVestingRule = hex"997460d7";
	bytes private constant SupplyCannotBeZero = hex"e7fbd426";
	bytes private constant EntityNotFound = hex"817a01f8";
	bytes private constant NewSupplyGoesToZero = hex"fefb85a0";
	bytes private constant NewSupplyHigherOnReduceMethod = hex"e4784a90";

	bytes private constant TIMESTAMP_LOWER_THAN_BLOCKTIME = hex"f61e035c";

	ERC20Mock private vsta = new ERC20Mock();
	VestingVesta private underTest;

	uint256 constant SIX_MONTHS = 26 weeks;
	uint256 constant TWO_YEARS = 730 days;

	address private owner;
	address[] private users;

	function setUp() public {
		vm.warp(1644125203);

		owner = accounts.PUBLIC_KEYS(0);

		vm.startPrank(owner);
		{
			underTest = new VestingVesta();

			vsta.mint(owner, 100_000_000 ether);
			vsta.approve(address(underTest), 100_000_000 ether);
			underTest.setUp(address(vsta), address(vsta));
		}
		vm.stopPrank();

		for (uint256 i = 1; i < 5; i++) {
			users.push(accounts.PUBLIC_KEYS(i));
		}
	}

	function test_validate_constants() public {
		assertEq(underTest.SIX_MONTHS(), SIX_MONTHS);
		assertEq(underTest.TWO_YEARS(), TWO_YEARS);
	}

	function test_setUp_asOwner_InvalidArgs_ThenReverts() public prankAs(owner) {
		underTest = new VestingVesta();

		vm.expectRevert(InvalidAddress);
		underTest.setUp(address(0), address(vsta));
		vm.expectRevert(InvalidAddress);
		underTest.setUp(address(vsta), address(0));
	}

	function test_setUp_asOwner_validArgs_ThenIsInitalizedAndHasOneAdmin()
		public
		prankAs(owner)
	{
		assertTrue(underTest.admins(address(vsta)));
		assertEq(address(underTest.vstaToken()), address(vsta));
	}

	function test_setAdmin_asUser_ThenRevertsNotOwner() public prankAs(users[0]) {
		vm.expectRevert(NOT_OWNER);
		underTest.setAdmin(msg.sender, true);
	}

	function test_setAdmin_asOwner_add_thenAddressIsAdmin()
		public
		prankAs(owner)
	{
		underTest.setAdmin(msg.sender, true);
		assertTrue(underTest.admins(msg.sender));
	}

	function test_setAdmin_asOwner_remove_thenAddressIsNotAdmin()
		public
		prankAs(owner)
	{
		underTest.setAdmin(address(vsta), false);
		assertTrue(!underTest.admins(address(vsta)));
	}

	function test_addEntityVestingWithConfig_asUser_ThenRevertsNotOwner()
		public
		prankAs(users[0])
	{
		vm.expectRevert(NoPermission);
		underTest.addEntityVestingWithConfig(
			msg.sender,
			0,
			100 ether,
			block.timestamp,
			10,
			100
		);
	}

	function test_addEntityVestingWithConfig_asOwner_ClaimingLockHigherThanVesting_ThenReverts()
		public
		prankAs(owner)
	{
		vm.expectRevert(ClaimingLockHigherThanVestingLock);
		underTest.addEntityVestingWithConfig(
			msg.sender,
			0,
			100 ether,
			block.timestamp,
			1000,
			100
		);
	}

	function test_addEntityVesting_asOwner_InvalidAddresses_ThenRevertsInvalidAddress()
		public
		prankAs(owner)
	{
		vm.expectRevert(InvalidAddress);
		underTest.addEntityVesting(address(0), 0, 1 ether);
	}

	function test_addEntityVesting_asOwner_ZeroSupply_ThenRevertsZeroSupply()
		public
		prankAs(owner)
	{
		vm.expectRevert(SupplyCannotBeZero);
		underTest.addEntityVesting(msg.sender, 0, 0);
	}

	function test_addEntityVestingWithInitialDateOnly_asUser_thenReverts()
		public
		prankAs(users[0])
	{
		vm.expectRevert(NoPermission);
		underTest.addEntityVestingWithInitialDateOnly(
			msg.sender,
			0,
			100 ether,
			block.timestamp
		);
	}

	function test_addEntityVestingWithInitialDateOnly_asOwner_NewEntity_ThenSavesEntityRuleWithDefaultSettings()
		public
		prankAs(owner)
	{
		uint256 currentBalance = vsta.balanceOf(owner);

		underTest.addEntityVestingWithInitialDateOnly(
			msg.sender,
			0,
			100 ether,
			block.timestamp
		);

		(
			uint256 createdDate,
			uint256 totalSupply,
			uint256 startVesting,
			uint256 endVestingDate,
			uint256 claimed
		) = underTest.entitiesVesting(msg.sender, 0);

		assertEq(createdDate, block.timestamp);
		assertEq(totalSupply, 100 ether);
		assertEq(startVesting, block.timestamp + underTest.SIX_MONTHS());
		assertEq(endVestingDate, block.timestamp + underTest.TWO_YEARS());
		assertEq(claimed, 0);

		assertLt(vsta.balanceOf(owner), currentBalance);
		assertEq(vsta.balanceOf(address(underTest)), 100 ether);
	}

	function test_addEntityVestingWithConfig_asOwner_NewEntity_ThenSavesEntityRule()
		public
		prankAs(owner)
	{
		uint256 currentBalance = vsta.balanceOf(owner);

		underTest.addEntityVestingWithConfig(
			msg.sender,
			0,
			100 ether,
			block.timestamp,
			10,
			100
		);
		(
			uint256 createdDate,
			uint256 totalSupply,
			uint256 startVesting,
			uint256 endVestingDate,
			uint256 claimed
		) = underTest.entitiesVesting(msg.sender, 0);

		assertEq(createdDate, block.timestamp);
		assertEq(totalSupply, 100 ether);
		assertEq(startVesting, block.timestamp + 10);
		assertEq(endVestingDate, block.timestamp + 100);
		assertEq(claimed, 0);

		assertLt(vsta.balanceOf(owner), currentBalance);
		assertEq(vsta.balanceOf(address(underTest)), 100 ether);
	}

	function test_addEntityVestingWithConfig_asOwner_AddTwiceNewEntityWithSameType_ThenRevertsDuplicated()
		public
		prankAs(owner)
	{
		underTest.addEntityVestingWithConfig(
			msg.sender,
			0,
			100 ether,
			block.timestamp,
			10,
			100
		);

		vm.expectRevert(DuplicatedVestingRule);
		underTest.addEntityVestingWithConfig(
			msg.sender,
			0,
			100 ether,
			block.timestamp,
			10,
			100
		);
	}

	function test_addEntityVesting_asUser_ThenRevertsNoPermission()
		public
		prankAs(users[0])
	{
		vm.expectRevert(NoPermission);
		underTest.addEntityVesting(msg.sender, 0, 100 ether);
	}

	function test_addEntityVesting_asOwner_InvalidAddress_ThenRevertsInvalidAddress()
		public
		prankAs(owner)
	{
		vm.expectRevert(InvalidAddress);
		underTest.addEntityVesting(address(0), 0, 100 ether);
	}

	function test_addEntityVesting_asOwner_ZeroSupply_ThenRevertsInvalidAddress()
		public
		prankAs(owner)
	{
		vm.expectRevert(SupplyCannotBeZero);
		underTest.addEntityVesting(msg.sender, 0, 0);
	}

	function test_addEntityVesting_asOwner_NewEntity_ThenSavesEntityRule()
		public
		prankAs(owner)
	{
		uint256 currentBalance = vsta.balanceOf(owner);

		underTest.addEntityVesting(msg.sender, 0, 100 ether);
		(
			uint256 createdDate,
			uint256 totalSupply,
			uint256 startVesting,
			uint256 endVestingDate,
			uint256 claimed
		) = underTest.entitiesVesting(msg.sender, 0);

		assertEq(createdDate, block.timestamp);
		assertEq(totalSupply, 100 ether);
		assertEq(startVesting, block.timestamp + SIX_MONTHS);
		assertEq(endVestingDate, block.timestamp + TWO_YEARS);
		assertEq(claimed, 0);

		assertLt(vsta.balanceOf(owner), currentBalance);
		assertEq(vsta.balanceOf(address(underTest)), 100 ether);
	}

	function test_addEntityVesting_asOwner_AddTwiceNewEntity_ThenRevertsDuplicated()
		public
		prankAs(owner)
	{
		underTest.addEntityVesting(msg.sender, 0, 100 ether);

		vm.expectRevert(DuplicatedVestingRule);
		underTest.addEntityVesting(msg.sender, 0, 100 ether);
	}

	function test_lowerEntityVesting_asUser_thenRevertsNotOwner()
		public
		prankAs(users[0])
	{
		vm.expectRevert(NOT_OWNER);
		underTest.lowerEntityVesting(msg.sender, 0, 5 ether, false);
	}

	function test_lowerEntityVesting_asOwner_NotFoundEntity_thenRevertsNotFoundEntity()
		public
		prankAs(owner)
	{
		vm.expectRevert(EntityNotFound);
		underTest.lowerEntityVesting(msg.sender, 0, 5 ether, false);
	}

	function test_lowerEntityVesting_asOwner_validEntityLowerThenNewSupplyIsZero_thenRevertsSupplyCannotBeZero()
		public
		prankAs(owner)
	{
		underTest.addEntityVesting(msg.sender, 0, 100 ether);

		vm.expectRevert(SupplyCannotBeZero);
		underTest.lowerEntityVesting(msg.sender, 0, 0 ether, false);
	}

	function test_lowerEntityVesting_asOwner_validEntityTimePassed_givesClaimableTokenAndLowerSupply()
		public
		prankAs(owner)
	{
		underTest.addEntityVesting(msg.sender, 0, 100 ether);
		vm.warp(block.timestamp + SIX_MONTHS + 1 weeks);

		uint256 totalClaimable = underTest.getClaimableVSTA(msg.sender, 0);
		underTest.lowerEntityVesting(msg.sender, 0, 50 ether, false);

		assertGt(totalClaimable, 0);
		assertEq(vsta.balanceOf(msg.sender), totalClaimable);
		assertEq(underTest.getEntityVestingTotalSupply(msg.sender, 0), 50 ether);
	}

	function test_lowerEntityVesting_asOwner_validEntityTimePassed_dontGivesClaimableTokenAndLowerSupply()
		public
		prankAs(owner)
	{
		underTest.addEntityVesting(msg.sender, 0, 100 ether);
		vm.warp(block.timestamp + SIX_MONTHS + 1 weeks);

		uint256 totalClaimable = underTest.getClaimableVSTA(msg.sender, 0);
		underTest.lowerEntityVesting(msg.sender, 0, 50 ether, true);

		assertGt(totalClaimable, 0);
		assertEq(vsta.balanceOf(msg.sender), 0);
		assertEq(underTest.getEntityVestingTotalSupply(msg.sender, 0), 50 ether);
	}

	function test_lowerEntityVesting_asOwner_validEntityTimePassedNewSupplyGoesToZero_thenRevertsNewSupplyGoesToZero()
		public
		prankAs(owner)
	{
		underTest.addEntityVesting(msg.sender, 0, 100 ether);
		vm.warp(block.timestamp + SIX_MONTHS * 2);

		uint256 leftOver = 99 ether - underTest.getClaimableVSTA(msg.sender, 0);

		vm.expectRevert(NewSupplyGoesToZero);
		underTest.lowerEntityVesting(msg.sender, 0, leftOver, false);
	}

	function test_lowerEntityVesting_asOwner_validEntityNewSupplyHigherThanTheCurrentOne_thenRevertsNewSupplyHigherCurrentOne()
		public
		prankAs(owner)
	{
		underTest.addEntityVesting(msg.sender, 0, 100 ether);

		vm.expectRevert(NewSupplyHigherOnReduceMethod);
		underTest.lowerEntityVesting(msg.sender, 0, 101 ether, false);
	}

	function test_removeEntityVesting_asUser_thenRevertsNotOwner()
		public
		prankAs(users[0])
	{
		vm.expectRevert(NOT_OWNER);
		underTest.removeEntityVesting(msg.sender, 0, false);
	}

	function test_removeEntityVesting_asOwner_NotFoundEntity_thenRevertsNotFoundEntity()
		public
		prankAs(owner)
	{
		vm.expectRevert(EntityNotFound);
		underTest.removeEntityVesting(msg.sender, 0, false);
	}

	function test_removeEntityVesting_asOwner_ValidEntity_thenSendClaimableTokenAndDeleteEntity()
		public
		prankAs(owner)
	{
		underTest.addEntityVesting(msg.sender, 0, 100 ether);
		vm.warp(block.timestamp + SIX_MONTHS * 2);

		uint256 claimableTokens = underTest.getClaimableVSTA(msg.sender, 0);

		underTest.removeEntityVesting(msg.sender, 0, false);

		(
			uint256 createdDate,
			uint256 totalSupply,
			uint256 startVesting,
			uint256 endVestingDate,
			uint256 claimed
		) = underTest.entitiesVesting(msg.sender, 0);

		assertEq(createdDate, 0);
		assertEq(totalSupply, 0);
		assertEq(startVesting, 0);
		assertEq(endVestingDate, 0);
		assertEq(claimed, 0);

		assertGt(claimableTokens, 0);
		assertEq(vsta.balanceOf(msg.sender), claimableTokens);
	}

	function test_removeEntityVesting_asOwner_ValidEntity_thenDontSendClaimableTokenAndDeleteEntity()
		public
		prankAs(owner)
	{
		underTest.addEntityVesting(msg.sender, 0, 100 ether);
		vm.warp(block.timestamp + SIX_MONTHS * 2);

		uint256 claimableTokens = underTest.getClaimableVSTA(msg.sender, 0);

		underTest.removeEntityVesting(msg.sender, 0, true);

		(
			uint256 createdDate,
			uint256 totalSupply,
			uint256 startVesting,
			uint256 endVestingDate,
			uint256 claimed
		) = underTest.entitiesVesting(msg.sender, 0);

		assertEq(createdDate, 0);
		assertEq(totalSupply, 0);
		assertEq(startVesting, 0);
		assertEq(endVestingDate, 0);
		assertEq(claimed, 0);

		assertGt(claimableTokens, 0);
		assertEq(vsta.balanceOf(msg.sender), 0);
	}

	function test_addSupplyToEntityVesting_asUser_thenRevertsNotOwner()
		public
		prankAs(users[0])
	{
		vm.expectRevert(NOT_OWNER);
		underTest.addSupplyToEntityVesting(msg.sender, 0, 10 ether);
	}

	function test_addSupplyToEntityVesting_asOwner_EntityNotFound_thenRevertsEntityNotFound()
		public
		prankAs(owner)
	{
		vm.expectRevert(EntityNotFound);
		underTest.addSupplyToEntityVesting(msg.sender, 0, 10 ether);
	}

	function test_addSupplyToEntityVesting_asOwner_ValidEntityAdd100_thenReturnsTotalSupplyWithExtra100()
		public
		prankAs(owner)
	{
		underTest.addEntityVesting(owner, 0, 100_000 ether);
		underTest.addSupplyToEntityVesting(owner, 0, 100 ether);

		assertEq(underTest.getEntityVestingTotalSupply(owner, 0), 100_100 ether);
	}

	function test_claimVSTAToken_asNotValidEntity_thenRevertsEntityNotFound()
		public
		prankAs(users[0])
	{
		vm.expectRevert(EntityNotFound);
		underTest.claimVSTAToken(0);
	}

	function test_claimVSTAToken_asValidEntityWithPendingClaimable_thenGiveClaimableAmount()
		public
	{
		vm.prank(owner);
		underTest.addEntityVesting(users[0], 0, 100_000 ether);

		vm.warp(block.timestamp + TWO_YEARS / 2);

		uint256 claimableTokens = underTest.getClaimableVSTA(users[0], 0);

		vm.prank(users[0]);
		underTest.claimVSTAToken(0);

		assertEq(vsta.balanceOf(users[0]), claimableTokens);
		assertEq(0, underTest.getClaimableVSTA(users[0], 0));
	}

	function test_transferUnassignedVSTA_asUser_thenRevertsNotOwner()
		public
		prankAs(users[0])
	{
		vm.expectRevert(NOT_OWNER);
		underTest.transferUnassignedVSTA();
	}

	function test_transferUnassignedVSTA_asOwnerWithNoUnassignedVSTA_thenReturnsZero()
		public
		prankAs(owner)
	{
		underTest.addEntityVesting(users[0], 0, 100_000 ether);
		underTest.addEntityVesting(users[1], 0, 100_000 ether);
		underTest.addEntityVesting(users[2], 0, 100_000 ether);

		uint256 beforeBalance = vsta.balanceOf(owner);

		underTest.transferUnassignedVSTA();

		assertEq(vsta.balanceOf(owner), beforeBalance);
	}

	function test_transferUnassignedVSTA_asOwnerWith100KUnassignedVSTA_thenReturns100K()
		public
		prankAs(owner)
	{
		underTest.addEntityVesting(users[0], 0, 100_000 ether);
		underTest.addEntityVesting(users[1], 0, 100_000 ether);
		underTest.addEntityVesting(users[2], 0, 100_000 ether);

		underTest.removeEntityVesting(users[2], 0, false);

		uint256 beforeBalance = vsta.balanceOf(owner);

		underTest.transferUnassignedVSTA();

		assertEq(vsta.balanceOf(owner), beforeBalance + 100_000 ether);
	}

	function test_getClaimableVSTA_1M_Over_6Months_minus_oneMinute_thenReturnsZero()
		public
		prankAs(owner)
	{
		underTest.addEntityVesting(msg.sender, 0, 1_000_000 ether);
		vm.warp(block.timestamp + SIX_MONTHS - 1 minutes);

		assertEq(underTest.getClaimableVSTA(msg.sender, 0), 0);
	}

	function test_getClaimableVSTA_1M_Over_6Months_thenReturns250k()
		public
		prankAs(owner)
	{
		underTest.addEntityVesting(msg.sender, 0, 1_000_000 ether);
		vm.warp(block.timestamp + SIX_MONTHS);

		assertAlmostEq(
			underTest.getClaimableVSTA(msg.sender, 0),
			250_000 ether,
			10_000 ether //0.01% forgivness
		);
	}

	function test_getClaimableVSTA_1M_Over_12Months_thenReturns500k()
		public
		prankAs(owner)
	{
		underTest.addEntityVesting(msg.sender, 0, 1_000_000 ether);
		vm.warp(block.timestamp + SIX_MONTHS * 2);

		assertAlmostEq(
			underTest.getClaimableVSTA(msg.sender, 0),
			500_000 ether,
			10_000 ether //0.01% forgivness
		);
	}

	function test_getClaimableVSTA_1M_Over_18Months_thenReturns750k()
		public
		prankAs(owner)
	{
		underTest.addEntityVesting(msg.sender, 0, 1_000_000 ether);
		vm.warp(block.timestamp + SIX_MONTHS * 3);

		assertAlmostEq(
			underTest.getClaimableVSTA(msg.sender, 0),
			750_000 ether,
			10_000 ether //0.01% forgivness
		);
	}

	function test_getClaimableVSTA_1M_Over_24Months_thenReturns1M()
		public
		prankAs(owner)
	{
		underTest.addEntityVesting(msg.sender, 0, 1_000_000 ether);
		vm.warp(block.timestamp + TWO_YEARS);

		assertAlmostEq(
			underTest.getClaimableVSTA(msg.sender, 0),
			1_000_000 ether,
			10_000 ether //0.01% forgivness
		);
	}

	function test_getClaimableVSTA_1M_2YearsLock_Over_6Years_thenReturns1M()
		public
		prankAs(owner)
	{
		underTest.addEntityVesting(msg.sender, 0, 1_000_000 ether);
		vm.warp(block.timestamp + TWO_YEARS * 3);

		assertEq(underTest.getClaimableVSTA(msg.sender, 0), 1_000_000 ether);
	}

	function test_getClaimableVSTA_1M_Over_Multi_claimOverTwoYears_thenEndsWith1M()
		public
		prankAs(owner)
	{
		underTest.addEntityVesting(owner, 0, 1_000_000 ether);
		uint256 currentBalance = vsta.balanceOf(owner);

		vm.warp(block.timestamp + SIX_MONTHS - 1 weeks);
		underTest.claimVSTAToken(0);

		vm.warp(block.timestamp + 1 weeks); // 6 months
		underTest.claimVSTAToken(0);

		vm.warp(block.timestamp + 4 weeks);
		underTest.claimVSTAToken(0);

		vm.warp(block.timestamp + 10 weeks);
		underTest.claimVSTAToken(0);

		vm.warp(block.timestamp + 8 weeks);
		underTest.claimVSTAToken(0);

		vm.warp(block.timestamp + 4 weeks); // 12 months
		underTest.claimVSTAToken(0);

		vm.warp(block.timestamp + SIX_MONTHS); // 18 months
		underTest.claimVSTAToken(0);

		vm.warp(block.timestamp + 10 weeks);
		underTest.claimVSTAToken(0);

		vm.warp(block.timestamp + 10 weeks);
		underTest.claimVSTAToken(0);

		vm.warp(block.timestamp + 6 weeks); // 2 years
		underTest.claimVSTAToken(0);

		assertAlmostEq(
			vsta.balanceOf(owner) - currentBalance,
			1_000_000 ether,
			10_000 ether //0.01% forgivness
		);
	}

	function test_getUnassignVSTATokensAmount_OnEntityShareLowered_thenReturnsRemovedShare()
		public
		prankAs(owner)
	{
		underTest.addEntityVesting(owner, 0, 1_000_000 ether);
		vm.warp(block.timestamp + SIX_MONTHS);

		underTest.lowerEntityVesting(owner, 0, 500_000 ether, false);

		assertEq(underTest.getUnassignVSTATokensAmount(), 500_000 ether);
	}

	function test_getUnassignVSTATokensAmount_OnEntityRemovedBeforeTheEnd_thenReturnsRemovedShare()
		public
		prankAs(owner)
	{
		underTest.addEntityVesting(owner, 0, 1_000_000 ether);
		vm.warp(block.timestamp + SIX_MONTHS);
		underTest.claimVSTAToken(0);

		uint256 leftOver = underTest.getEntityVestingLeft(owner, 0);
		underTest.removeEntityVesting(owner, 0, false);

		assertEq(underTest.getUnassignVSTATokensAmount(), leftOver);
	}

	function test_assignedVSTATokens_onAddEntity100k_then100kToAssignedTokens()
		public
		prankAs(owner)
	{
		underTest.addEntityVesting(owner, 0, 100_000 ether);
		assertEq(underTest.assignedVSTATokens(), 100_000 ether);
	}

	function test_assignedVSTATokens_entityWith100kClaimAfter6Months_thenReducesAssignedTokens()
		public
		prankAs(owner)
	{
		underTest.addEntityVesting(owner, 0, 100_000 ether);
		vm.warp(block.timestamp + SIX_MONTHS);
		uint256 claimable = underTest.getClaimableVSTA(owner, 0);
		underTest.claimVSTAToken(0);

		assertEq(underTest.assignedVSTATokens(), 100_000 ether - claimable);
	}

	function test_assignedVSTATokens_addSupplyToEntity_thenIncreasesAssignedTokens()
		public
		prankAs(owner)
	{
		underTest.addEntityVesting(owner, 0, 100_000 ether);
		underTest.addSupplyToEntityVesting(owner, 0, 100 ether);

		assertEq(underTest.assignedVSTATokens(), 100_100 ether);
	}

	function test_assignedVSTATokens_onEntityDeleted_thenDecreasesAssignedTokens()
		public
		prankAs(owner)
	{
		underTest.addEntityVesting(owner, 0, 100_000 ether);
		underTest.removeEntityVesting(owner, 0, false);

		assertEq(underTest.assignedVSTATokens(), 0);
	}
}
