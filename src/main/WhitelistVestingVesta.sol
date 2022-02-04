pragma solidity ^0.8.11;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./interfaces/IVestingVsta.sol";

contract WhitelistVestingVesta is Ownable, IVestingVsta {
	using SafeERC20 for IERC20;
	using SafeMath for uint256;

	struct Rule {
		uint256 createdDate;
		uint256 totalSupply;
		uint256 startVestingDate;
		uint256 endVestingDate;
		uint256 claimed;
	}

	string public constant NAME = "WhitelistVestingVesta";
	uint256 public constant SIX_MONTHS = 26 weeks;
	uint256 public constant TWO_YEARS = 730 days;

	bool public isInitialized;

	IERC20 private vstaToken;
	uint256 private assignedVSTATokens;

	mapping(address => Rule) public entitiesVesting;

	modifier entityRuleExists(address _entity) {
		require(
			entitiesVesting[_entity].createdDate != 0,
			"Entity doesn't have a Vesting Rule"
		);
		_;
	}

	function setAddresses(address _vstaAddress, address _whitelisting)
		public
		onlyOwner
	{
		require(!isInitialized, "Already Initialized");
		require(address(_vstaAddress) != address(0), "Invalid VSTA addr");
		isInitialized = true;

		vstaToken = IERC20(_vstaAddress);
		transferOwnership(_whitelisting);
	}

	function addEntityVesting(address _entity, uint256 _totalSupply)
		public
		onlyOwner
	{
		require(address(0) != _entity, "Invalid Address");

		require(
			entitiesVesting[_entity].createdDate == 0,
			"Entity already has a Vesting Rule"
		);

		assignedVSTATokens += _totalSupply;

		entitiesVesting[_entity] = Rule(
			block.timestamp,
			_totalSupply,
			block.timestamp.add(SIX_MONTHS),
			block.timestamp.add(TWO_YEARS),
			0
		);

		vstaToken.safeTransferFrom(msg.sender, address(this), _totalSupply);
	}

	function claimVSTAToken() public entityRuleExists(msg.sender) {
		sendVSTATokenToEntity(msg.sender);
	}

	function sendVSTATokenToEntity(address _entity) private {
		uint256 unclaimedAmount = getClaimableVSTA(_entity);
		if (unclaimedAmount == 0) return;

		Rule storage entityRule = entitiesVesting[_entity];
		entityRule.claimed += unclaimedAmount;

		assignedVSTATokens = assignedVSTATokens.sub(unclaimedAmount);
		vstaToken.safeTransfer(_entity, unclaimedAmount);
	}

	function getClaimableVSTA(address _entity)
		public
		view
		returns (uint256 claimable)
	{
		Rule memory entityRule = entitiesVesting[_entity];
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

	function isEntityExits(address _entity) public view returns (bool) {
		return entitiesVesting[_entity].createdDate != 0;
	}
}
