const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CortexaToken", function () {
  // Fixture to deploy the contract and get signers
  async function deployTokenFixture() {
    const [owner, addr1, addr2, marketingWallet] = await ethers.getSigners();
    const token = await ethers.deployContract("CortexaToken");
    return { token, owner, addr1, addr2, marketingWallet };
  }

  describe("Deployment", function () {
    it("Should set the right name and symbol", async function () {
      const { token } = await deployTokenFixture();
      expect(await token.name()).to.equal("Cortexa");
      expect(await token.symbol()).to.equal("CTX");
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const { token, owner } = await deployTokenFixture();
      const ownerBalance = await token.balanceOf(owner.address);
      expect(await token.totalSupply()).to.equal(ownerBalance);
    });

    it("Should set the correct total supply (1,000,000,000)", async function () {
      const { token } = await deployTokenFixture();
      const decimals = await token.decimals();
      const expectedSupply = 1000000000n * (10n ** decimals);
      expect(await token.totalSupply()).to.equal(expectedSupply);
    });

    it("Should set the deployer as owner", async function () {
      const { token, owner } = await deployTokenFixture();
      expect(await token.owner()).to.equal(owner.address);
    });

    it("Should set the deployer as marketing wallet", async function () {
      const { token, owner } = await deployTokenFixture();
      expect(await token.marketingWallet()).to.equal(owner.address);
    });

    it("Should set default tax rates (2% marketing, 1% burn)", async function () {
      const { token } = await deployTokenFixture();
      expect(await token.marketingTaxPercent()).to.equal(2);
      expect(await token.burnTaxPercent()).to.equal(1);
    });

    it("Should exclude owner from fees", async function () {
      const { token, owner } = await deployTokenFixture();
      expect(await token.isExcludedFromFee(owner.address)).to.equal(true);
    });
  });

  describe("Tax-Free Transfers (Excluded Addresses)", function () {
    it("Should transfer full amount when sender is excluded from fee", async function () {
      const { token, owner, addr1 } = await deployTokenFixture();
      const decimals = await token.decimals();
      const amount = 1000n * (10n ** decimals);

      // Owner is excluded, so no tax should be applied
      await token.transfer(addr1.address, amount);
      expect(await token.balanceOf(addr1.address)).to.equal(amount);
    });
  });

  describe("Taxed Transfers (Non-Excluded Addresses)", function () {
    it("Should apply 3% total tax (2% marketing + 1% burn) on transfers", async function () {
      const { token, owner, addr1, addr2 } = await deployTokenFixture();
      const decimals = await token.decimals();
      const seedAmount = 10000n * (10n ** decimals);
      const transferAmount = 1000n * (10n ** decimals);

      // First, seed addr1 with tokens (owner is excluded, so no tax)
      await token.transfer(addr1.address, seedAmount);

      // Record state before taxed transfer
      const marketingWalletAddr = await token.marketingWallet();
      const marketingBalBefore = await token.balanceOf(marketingWalletAddr);
      const totalSupplyBefore = await token.totalSupply();

      // addr1 -> addr2 (NEITHER is excluded, so tax applies)
      await token.connect(addr1).transfer(addr2.address, transferAmount);

      // Expected fees
      const expectedMarketingFee = (transferAmount * 2n) / 100n;  // 2%
      const expectedBurnFee = (transferAmount * 1n) / 100n;        // 1%
      const expectedReceived = transferAmount - expectedMarketingFee - expectedBurnFee; // 97%

      // Verify addr2 received 97% of the transfer
      expect(await token.balanceOf(addr2.address)).to.equal(expectedReceived);

      // Verify marketing wallet received 2%
      const marketingBalAfter = await token.balanceOf(marketingWalletAddr);
      expect(marketingBalAfter - marketingBalBefore).to.equal(expectedMarketingFee);

      // Verify total supply decreased by 1% (burn)
      const totalSupplyAfter = await token.totalSupply();
      expect(totalSupplyBefore - totalSupplyAfter).to.equal(expectedBurnFee);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const { token, owner, addr1 } = await deployTokenFixture();
      const initialOwnerBalance = await token.balanceOf(owner.address);

      // addr1 has 0 tokens
      await expect(
        token.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");

      expect(await token.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });
  });

  describe("Burning", function () {
    it("Should allow token burning by holders", async function () {
      const { token, owner } = await deployTokenFixture();
      const decimals = await token.decimals();
      const burnAmount = 100n * (10n ** decimals);
      const initialSupply = await token.totalSupply();
      const initialOwnerBalance = await token.balanceOf(owner.address);

      await token.burn(burnAmount);

      expect(await token.balanceOf(owner.address)).to.equal(initialOwnerBalance - burnAmount);
      expect(await token.totalSupply()).to.equal(initialSupply - burnAmount);
    });
  });

  describe("Owner Functions", function () {
    it("Should allow owner to update the marketing wallet", async function () {
      const { token, owner, marketingWallet } = await deployTokenFixture();

      await token.setMarketingWallet(marketingWallet.address);
      expect(await token.marketingWallet()).to.equal(marketingWallet.address);
      expect(await token.isExcludedFromFee(marketingWallet.address)).to.equal(true);
    });

    it("Should not allow setting marketing wallet to zero address", async function () {
      const { token } = await deployTokenFixture();
      await expect(
        token.setMarketingWallet(ethers.ZeroAddress)
      ).to.be.revertedWith("Marketing wallet cannot be zero address");
    });

    it("Should allow owner to update tax rates", async function () {
      const { token } = await deployTokenFixture();
      await token.setTaxRates(3, 2);
      expect(await token.marketingTaxPercent()).to.equal(3);
      expect(await token.burnTaxPercent()).to.equal(2);
    });

    it("Should not allow total tax to exceed 10%", async function () {
      const { token } = await deployTokenFixture();
      await expect(
        token.setTaxRates(8, 5) // 13% total > 10% max
      ).to.be.revertedWith("Total tax exceeds maximum allowed");
    });

    it("Should allow owner to exclude/include addresses from fee", async function () {
      const { token, addr1 } = await deployTokenFixture();

      await token.setExcludedFromFee(addr1.address, true);
      expect(await token.isExcludedFromFee(addr1.address)).to.equal(true);

      await token.setExcludedFromFee(addr1.address, false);
      expect(await token.isExcludedFromFee(addr1.address)).to.equal(false);
    });

    it("Should not allow non-owner to change tax rates", async function () {
      const { token, addr1 } = await deployTokenFixture();
      await expect(
        token.connect(addr1).setTaxRates(5, 5)
      ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
    });
  });
});
