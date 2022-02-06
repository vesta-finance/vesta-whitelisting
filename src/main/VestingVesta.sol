pragma solidity ^0.8.11;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./interfaces/IVestingVsta.sol";

contract VestingVesta is Ownable, IVestingVsta {
	using SafeERC20 for IERC20;
	using SafeMath for uint256;

	error AlreadyInitialized();
	error NoPermission();
	error EntityNotFound();
	error InvalidAddress();
	error DuplicatedVestingRule();
	error ClaimingLockHigherThanVestingLock();
	error SupplyCannotBeZero();
	error NewSupplyGoesToZero();
	error NewSupplyHigherOnReduceMethod();

	struct Rule {
		uint256 createdDate;
		uint256 totalSupply;
		uint256 startVestingDate;
		uint256 endVestingDate;
		uint256 claimed;
	}

	string public constant NAME = "VestingVesta";
	uint256 public constant SIX_MONTHS = 26 weeks; //4.3 * 6 == 25.8 -> 26
	uint256 public constant TWO_YEARS = 730 days;

	bool public isInitialized;

	IERC20 public vstaToken;
	uint256 public assignedVSTATokens;

	mapping(address => bool) public admins;
	mapping(address => mapping(uint256 => Rule)) public entitiesVesting;

	modifier entityRuleExists(address _entity, uint256 _vestingType) {
		if (!isEntityExits(_entity, _vestingType)) {
			revert EntityNotFound();
		}

		_;
	}

	modifier isAdmin() {
		if (!admins[msg.sender] && msg.sender != owner()) revert NoPermission();
		_;
	}

	function initialize(address _vstaAddress, address _whitelistAddr)
		public
		onlyOwner
	{
		if (isInitialized) revert AlreadyInitialized();
		if (_whitelistAddr == address(0) || _vstaAddress == address(0))
			revert InvalidAddress();

		isInitialized = true;
		admins[_whitelistAddr] = true;
		vstaToken = IERC20(_vstaAddress);
	}

	function setAdmin(address _wallet, bool _status) public onlyOwner {
		admins[_wallet] = _status;
	}

	function addEntityVestingWithConfig(
		address _entity,
		uint256 _vestingType,
		uint256 _totalSupply,
		uint256 _lockClaiming,
		uint256 _vestingDuration
	) external override isAdmin {
		if (_lockClaiming > _vestingDuration)
			revert ClaimingLockHigherThanVestingLock();

		_addEntityVesting(
			_entity,
			_vestingType,
			_totalSupply,
			_lockClaiming,
			_vestingDuration
		);
	}

	function addEntityVesting(
		address _entity,
		uint256 _vestingType,
		uint256 _totalSupply
	) external override isAdmin {
		_addEntityVesting(
			_entity,
			_vestingType,
			_totalSupply,
			SIX_MONTHS,
			TWO_YEARS
		);
	}

	function _addEntityVesting(
		address _entity,
		uint256 _vestingType,
		uint256 _totalSupply,
		uint256 _claimingLock,
		uint256 _vestingDuration
	) internal {
		if (address(0) == _entity) revert InvalidAddress();
		if (isEntityExits(_entity, _vestingType)) revert DuplicatedVestingRule();
		if (_totalSupply == 0) revert SupplyCannotBeZero();

		assignedVSTATokens += _totalSupply;

		entitiesVesting[_entity][_vestingType] = Rule(
			block.timestamp,
			_totalSupply,
			block.timestamp.add(_claimingLock),
			block.timestamp.add(_vestingDuration),
			0
		);

		vstaToken.safeTransferFrom(msg.sender, address(this), _totalSupply);
	}

	function lowerEntityVesting(
		address _entity,
		uint256 _vestingType,
		uint256 _newTotalSupply
	) external override onlyOwner entityRuleExists(_entity, _vestingType) {
		if (_newTotalSupply == 0) revert SupplyCannotBeZero();

		sendVSTATokenToEntity(_entity, _vestingType);
		Rule storage vestingRule = entitiesVesting[_entity][_vestingType];

		if (_newTotalSupply <= vestingRule.claimed) revert NewSupplyGoesToZero();
		if (_newTotalSupply >= vestingRule.totalSupply)
			revert NewSupplyHigherOnReduceMethod();

		uint256 removedSupply = vestingRule.totalSupply.sub(_newTotalSupply);
		assignedVSTATokens = assignedVSTATokens.sub(removedSupply);

		vestingRule.totalSupply = _newTotalSupply;
	}

	function addSupplyToEntityVesting(
		address _entity,
		uint256 _vestingType,
		uint256 _extraSupply
	) external override onlyOwner entityRuleExists(_entity, _vestingType) {
		Rule storage vestingRule = entitiesVesting[_entity][_vestingType];

		vestingRule.totalSupply = vestingRule.totalSupply.add(_extraSupply);
		assignedVSTATokens = assignedVSTATokens.add(_extraSupply);

		vstaToken.safeTransferFrom(msg.sender, address(this), _extraSupply);
	}

	function removeEntityVesting(address _entity, uint256 _vestingType)
		external
		override
		onlyOwner
		entityRuleExists(_entity, _vestingType)
	{
		sendVSTATokenToEntity(_entity, _vestingType);
		Rule memory vestingRule = entitiesVesting[_entity][_vestingType];

		assignedVSTATokens = assignedVSTATokens.sub(
			vestingRule.totalSupply.sub(vestingRule.claimed)
		);

		delete entitiesVesting[_entity][_vestingType];
	}

	function claimVSTAToken(uint256 _vestingType)
		external
		override
		entityRuleExists(msg.sender, _vestingType)
	{
		sendVSTATokenToEntity(msg.sender, _vestingType);
	}

	function sendVSTATokenToEntity(address _entity, uint256 _vestingType)
		private
	{
		uint256 unclaimedAmount = getClaimableVSTA(_entity, _vestingType);
		if (unclaimedAmount == 0) return;

		Rule storage entityRule = entitiesVesting[_entity][_vestingType];
		entityRule.claimed += unclaimedAmount;

		assignedVSTATokens = assignedVSTATokens.sub(unclaimedAmount);
		vstaToken.safeTransfer(_entity, unclaimedAmount);
	}

	function transferUnassignedVSTA() external override onlyOwner {
		uint256 unassignedTokens = getUnassignVSTATokensAmount();

		if (unassignedTokens == 0) return;

		vstaToken.safeTransfer(msg.sender, unassignedTokens);
	}

	function getClaimableVSTA(address _entity, uint256 _vestingType)
		public
		view
		override
		returns (uint256 claimable)
	{
		Rule memory entityRule = entitiesVesting[_entity][_vestingType];
		claimable = 0;

		if (entityRule.startVestingDate > block.timestamp) return claimable;

		if (block.timestamp >= entityRule.endVestingDate) {
			claimable = entityRule.totalSupply.sub(entityRule.claimed);
		} else {
			claimable = entityRule
				.totalSupply
				.div(TWO_YEARS)
				.mul(block.timestamp.sub(entityRule.createdDate))
				.sub(entityRule.claimed);
		}

		return claimable;
	}

	function getUnassignVSTATokensAmount()
		public
		view
		override
		returns (uint256)
	{
		return vstaToken.balanceOf(address(this)).sub(assignedVSTATokens);
	}

	function getEntityVestingTotalSupply(address _entity, uint256 _vestingType)
		external
		view
		override
		returns (uint256)
	{
		return entitiesVesting[_entity][_vestingType].totalSupply;
	}

	function getEntityVestingLeft(address _entity, uint256 _vestingType)
		external
		view
		override
		returns (uint256)
	{
		Rule memory entityRule = entitiesVesting[_entity][_vestingType];
		return entityRule.totalSupply.sub(entityRule.claimed);
	}

	function isEntityExits(address _entity, uint256 _vestingType)
		public
		view
		override
		returns (bool)
	{
		return entitiesVesting[_entity][_vestingType].createdDate != 0;
	}
}