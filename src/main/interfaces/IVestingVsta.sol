pragma solidity ^0.8.10;

interface IVestingVsta {
	function addEntityVesting(address _entity, uint256 _totalSupply) external;
}
