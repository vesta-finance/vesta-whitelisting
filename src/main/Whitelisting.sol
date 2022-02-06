// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

import "./interfaces/IVestingVsta.sol";

contract Whitelisting is Ownable {
	using SafeMath for uint256;
	using SafeERC20 for IERC20;

	event Claimed(address account, uint256 amountVsta);
	event ActionRequired(address account, uint256 amountVsta);

	uint256 public constant DB_UNIT = 6;
	uint256 public constant TARGET_UNIT = 18;

	bool public isInitialized;

	IERC20 public vesta;
	IVestingVsta public vestingVesta;
	bytes32 public merkleRoot;

	uint256 tokenPrice;

	mapping(address => uint256) public whitelistUserBought;
	mapping(address => bool) public hasClaimed;

	modifier onlyNotClaimed() {
		require(!hasClaimed[msg.sender], "Already claimed!");
		_;
	}

	function setAddresses(
		IERC20 _vestaToken,
		address _vestingVesta,
		uint256 _tokenPrice,
		uint256 _totalSupply,
		bytes32 _merkleRoot
	) external onlyOwner {
		require(_vestaToken.totalSupply() > 0, "Invalid erc20");
		require(
			address(_vestingVesta) != address(0),
			"Invalid LockedVsta Contract"
		);
		require(_tokenPrice > 0, "Invalid token price");
		require(_totalSupply > 0, "Invalid total supply");
		require(_merkleRoot != bytes32(0), "Invalid MarkleRoot");
		require(!isInitialized, "Already Initialized");
		isInitialized = true;

		tokenPrice = _tokenPrice;
		merkleRoot = _merkleRoot;

		vesta = _vestaToken;
		vestingVesta = IVestingVsta(_vestingVesta);

		vesta.safeApprove(address(_vestingVesta), type(uint256).max);
		vesta.safeTransferFrom(msg.sender, address(this), _totalSupply);
	}

	function claim(uint256 _usdcAmount, bytes32[] calldata _merkleProof)
		external
		onlyNotClaimed
	{
		bytes32 node = keccak256(abi.encodePacked(msg.sender, _usdcAmount));

		require(
			MerkleProof.verify(_merkleProof, merkleRoot, node),
			"MerkleDistributor: Invalid proof."
		);

		hasClaimed[msg.sender] = true;
		_usdcAmount = covertToEther(_usdcAmount);

		uint256 vestaTokensTotal = _usdcAmount.div(tokenPrice).mul(1 ether);
		uint256 fiftyPercentToken = vestaTokensTotal.div(2);

		vesta.safeTransfer(msg.sender, fiftyPercentToken);

		vestingVesta.addEntityVesting(msg.sender, 0, fiftyPercentToken);
		emit Claimed(msg.sender, fiftyPercentToken);
	}

	function covertToEther(uint256 _usdcAmount) public pure returns (uint256) {
		return _usdcAmount.mul(10**(TARGET_UNIT - DB_UNIT));
	}

	function emergencyChangeRoot(bytes32 newRoot) external onlyOwner {
		require(newRoot != bytes32(0), "Invalid Root");
		merkleRoot = newRoot;
	}
}
