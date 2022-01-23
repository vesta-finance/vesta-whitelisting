pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Mock is ERC20("Mock", "mk") {
	function mint(address _user, uint256 _amount) public {
		_mint(_user, _amount);
	}
}
