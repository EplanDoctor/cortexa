// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Cortexa Airdrop & Sale Contract
 * @dev Handles:
 *   1. Welcome Airdrop: 100 CTX for anyone who connects wallet (claimable once)
 *   2. Token Purchase: Buy CTX using BNB (includes a 10% bonus automatically)
 */
contract CortexaAirdrop is Ownable {
    IERC20 public token;

    // Welcome Airdrop settings (100 CTX)
    uint256 public welcomeAirdropAmount = 100 * 10**18;
    mapping(address => bool) public hasClaimedWelcome;

    // Token Sale settings (1 BNB = 1,000,000 CTX default)
    uint256 public tokensPerBNB = 1_000_000;
    
    // Purchase Bonus (10%)
    uint256 public bonusPercent = 10;

    // Events
    event WelcomeAirdropClaimed(address indexed user, uint256 amount);
    event TokensPurchased(address indexed buyer, uint256 bnbAmount, uint256 tokenAmount, uint256 bonusAmount);
    event RatesUpdated(uint256 newTokensPerBNB, uint256 newBonusPercent);
    event WelcomeAmountUpdated(uint256 newAmount);

    constructor(address _tokenAddress) Ownable(msg.sender) {
        require(_tokenAddress != address(0), "Invalid token address");
        token = IERC20(_tokenAddress);
    }

    /**
     * @dev Allows users to claim their one-time 100 CTX welcome gift.
     */
    function claimWelcomeAirdrop() external {
        require(!hasClaimedWelcome[msg.sender], "Airdrop already claimed");
        require(token.balanceOf(address(this)) >= welcomeAirdropAmount, "Insufficient tokens in airdrop pool");

        hasClaimedWelcome[msg.sender] = true;
        require(token.transfer(msg.sender, welcomeAirdropAmount), "Airdrop transfer failed");

        emit WelcomeAirdropClaimed(msg.sender, welcomeAirdropAmount);
    }

    /**
     * @dev Allows users to purchase CTX using BNB. Automatically calculates the 10% bonus.
     */
    function buyTokens() public payable {
        require(msg.value > 0, "Send BNB to buy tokens");

        uint256 baseAmount = msg.value * tokensPerBNB;
        uint256 bonusAmount = (baseAmount * bonusPercent) / 100;
        uint256 totalAmount = baseAmount + bonusAmount;

        require(token.balanceOf(address(this)) >= totalAmount, "Insufficient tokens in sale pool");

        require(token.transfer(msg.sender, totalAmount), "Token transfer failed");

        emit TokensPurchased(msg.sender, msg.value, baseAmount, bonusAmount);
    }

    /**
     * @dev Fallback function to allow direct BNB transfers to purchase tokens.
     */
    receive() external payable {
        buyTokens();
    }

    // --- Admin Functions ---

    /**
     * @dev Configures the sale rate and bonus percentage.
     */
    function setRates(uint256 _tokensPerBNB, uint256 _bonusPercent) external onlyOwner {
        tokensPerBNB = _tokensPerBNB;
        bonusPercent = _bonusPercent;
        emit RatesUpdated(_tokensPerBNB, _bonusPercent);
    }

    /**
     * @dev Configures the welcome airdrop size.
     */
    function setWelcomeAirdropAmount(uint256 _amount) external onlyOwner {
        welcomeAirdropAmount = _amount;
        emit WelcomeAmountUpdated(_amount);
    }

    /**
     * @dev Withdraws BNB accumulated from token sales to the owner wallet.
     */
    function withdrawBNB() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No BNB to withdraw");
        payable(owner()).transfer(balance);
    }

    /**
     * @dev Withdraws unspent CTX tokens back to the owner.
     */
    function withdrawTokens(uint256 _amount) external onlyOwner {
        require(token.balanceOf(address(this)) >= _amount, "Insufficient token balance");
        require(token.transfer(owner(), _amount), "Token transfer failed");
    }
}
