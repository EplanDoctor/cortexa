// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Cortexa Token
 * @dev ERC20 Token with:
 *   - Burnable capability
 *   - Ownership access control
 *   - 2% Marketing Tax (sent to marketing wallet on every transfer)
 *   - 1% Auto-Burn Tax (permanently removed from supply on every transfer)
 * 
 * Name: Cortexa
 * Symbol: CTX
 * Total Supply: 1,000,000,000 CTX (1 Billion)
 */
contract CortexaToken is ERC20, ERC20Burnable, Ownable {

    // --- Tax Configuration ---
    uint256 public marketingTaxPercent = 2;  // 2% marketing tax
    uint256 public burnTaxPercent = 1;       // 1% auto-burn tax
    uint256 public constant MAX_TAX = 10;    // Safety cap: max 10% total tax

    // Marketing wallet that receives the marketing tax
    address public marketingWallet;

    // Addresses excluded from paying tax (owner, contract, marketing wallet, etc.)
    mapping(address => bool) private _isExcludedFromFee;

    // --- Events ---
    event MarketingWalletUpdated(address indexed oldWallet, address indexed newWallet);
    event TaxRatesUpdated(uint256 newMarketingTax, uint256 newBurnTax);
    event AddressExcludedFromFee(address indexed account, bool isExcluded);

    // --- Constructor ---
    constructor() ERC20("Cortexa", "CTX") Ownable(msg.sender) {
        // Set deployer as the initial marketing wallet
        marketingWallet = msg.sender;

        // Exclude owner and contract from fees
        _isExcludedFromFee[msg.sender] = true;
        _isExcludedFromFee[address(this)] = true;

        // Mint 1,000,000,000 tokens with 18 decimal places to the deployer
        _mint(msg.sender, 1_000_000_000 * 10 ** decimals());
    }

    // --- Tax Logic ---

    /**
     * @dev Overrides the internal _update function to apply tax on transfers.
     * Tax is NOT applied when:
     *   - Minting (from == address(0))
     *   - Burning (to == address(0))
     *   - Sender or receiver is excluded from fee
     */
    function _update(address from, address to, uint256 value) internal virtual override {
        // Skip tax for minting, burning, or excluded addresses
        if (
            from == address(0) ||
            to == address(0) ||
            _isExcludedFromFee[from] ||
            _isExcludedFromFee[to]
        ) {
            super._update(from, to, value);
            return;
        }

        // Calculate fees
        uint256 marketingFee = (value * marketingTaxPercent) / 100;
        uint256 burnFee = (value * burnTaxPercent) / 100;
        uint256 transferAmount = value - marketingFee - burnFee;

        // Send marketing fee to marketing wallet
        super._update(from, marketingWallet, marketingFee);

        // Burn the burn fee (send to address(0) reduces totalSupply)
        super._update(from, address(0), burnFee);

        // Transfer the remaining amount to the recipient
        super._update(from, to, transferAmount);
    }

    // --- Owner Functions ---

    /**
     * @dev Updates the marketing wallet address. Only callable by owner.
     */
    function setMarketingWallet(address newWallet) external onlyOwner {
        require(newWallet != address(0), "Marketing wallet cannot be zero address");
        address oldWallet = marketingWallet;

        // Remove old wallet from exclusion, add new one
        _isExcludedFromFee[oldWallet] = false;
        _isExcludedFromFee[newWallet] = true;

        marketingWallet = newWallet;
        emit MarketingWalletUpdated(oldWallet, newWallet);
    }

    /**
     * @dev Updates tax rates. Total tax cannot exceed MAX_TAX (10%). Only callable by owner.
     */
    function setTaxRates(uint256 newMarketingTax, uint256 newBurnTax) external onlyOwner {
        require(newMarketingTax + newBurnTax <= MAX_TAX, "Total tax exceeds maximum allowed");
        marketingTaxPercent = newMarketingTax;
        burnTaxPercent = newBurnTax;
        emit TaxRatesUpdated(newMarketingTax, newBurnTax);
    }

    /**
     * @dev Exclude or include an address from/in fee. Only callable by owner.
     */
    function setExcludedFromFee(address account, bool excluded) external onlyOwner {
        _isExcludedFromFee[account] = excluded;
        emit AddressExcludedFromFee(account, excluded);
    }

    /**
     * @dev Check if an address is excluded from fee.
     */
    function isExcludedFromFee(address account) external view returns (bool) {
        return _isExcludedFromFee[account];
    }
}
