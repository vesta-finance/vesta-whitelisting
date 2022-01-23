pragma solidity ^0.8.10;

interface ILockedVsta {
	function addEntityVesting(address _entity, uint256 _totalSupply)
		external;
}
