// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

import "./libs/ILockedVsta.sol";

contract Whitelisting is Ownable {
	using SafeMath for uint256;
	using SafeERC20 for IERC20;

	event Claimed(address account, uint256 amountVsta);

	IERC20 public vesta;
	ILockedVsta public lockedVesta;
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
		ILockedVsta _lockedVsta,
		uint256 _tokenPrice,
		uint256 _totalSupply,
		bytes32 _merkleRoot
	) external onlyOwner {
		require(_vestaToken.totalSupply() > 0, "Invalid erc20");
		require(address(_lockedVsta) != address(0), "Invalid LockedVsta Contract");
		require(_tokenPrice > 0, "Invalid token price");
		require(_totalSupply > 0, "Invalid total supply");
		require(_merkleRoot != bytes32(0), "Invalid MarkleRoot");

		tokenPrice = _tokenPrice;
		merkleRoot = _merkleRoot;

		vesta = _vestaToken;
		lockedVesta = _lockedVsta;

		vesta.safeTransferFrom(msg.sender, address(this), _totalSupply);
	}

	function claim(
		uint256 _index,
		uint256 _usdcAmount,
		bytes32[] calldata _merkleProof
	) external onlyNotClaimed {
		bytes32 node = keccak256(abi.encodePacked(_index, msg.sender, _usdcAmount));

		require(
			MerkleProof.verify(_merkleProof, merkleRoot, node),
			"MerkleDistributor: Invalid proof."
		);

		uint256 vestaTokensTotal = _usdcAmount.div(tokenPrice).mul(1 ether);
		uint256 fiftyPercentToken = vestaTokensTotal.div(2);

		vesta.safeTransfer(msg.sender, fiftyPercentToken);
		lockedVesta.addEntityVesting(msg.sender, fiftyPercentToken);

		emit Claimed(msg.sender, fiftyPercentToken);
	}

	function emergencyChangeRoot(bytes32 newRoot) external onlyOwner {
		require(newRoot != bytes32(0), "Invalid Root");
		merkleRoot = newRoot;
	}
}
