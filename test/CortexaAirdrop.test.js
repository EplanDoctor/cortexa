const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CortexaAirdrop", function () {
  async function deployAirdropFixture() {
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();

    // Deploy CortexaToken
    const token = await ethers.deployContract("CortexaToken");

    // Deploy CortexaAirdrop
    const airdrop = await ethers.deployContract("CortexaAirdrop", [token.target]);

    // Fund the airdrop contract with 1,000,000 CTX from owner's initial supply
    const decimals = await token.decimals();
    const fundAmount = 1_000_000n * (10n ** decimals);
    await token.transfer(airdrop.target, fundAmount);

    // Exclude the airdrop contract from fees so users receive the full claimed/bought amount
    await token.setExcludedFromFee(airdrop.target, true);

    return { token, airdrop, owner, addr1, addr2, addr3, decimals, fundAmount };
  }

  describe("Deployment", function () {
    it("Should link the correct token address", async function () {
      const { token, airdrop } = await deployAirdropFixture();
      expect(await airdrop.token()).to.equal(token.target);
    });

    it("Should have correct default rates and amounts", async function () {
      const { airdrop, decimals } = await deployAirdropFixture();
      const expectedWelcome = 100n * (10n ** decimals);
      expect(await airdrop.welcomeAirdropAmount()).to.equal(expectedWelcome);
      expect(await airdrop.tokensPerBNB()).to.equal(1_000_000);
      expect(await airdrop.bonusPercent()).to.equal(10);
    });

    it("Should set the deployer as owner", async function () {
      const { airdrop, owner } = await deployAirdropFixture();
      expect(await airdrop.owner()).to.equal(owner.address);
    });
  });

  describe("Welcome Airdrop", function () {
    it("Should allow a user to claim 100 CTX welcome gift once", async function () {
      const { airdrop, token, addr1, decimals } = await deployAirdropFixture();
      const claimAmount = 100n * (10n ** decimals);

      // Claim airdrop
      await expect(airdrop.connect(addr1).claimWelcomeAirdrop())
        .to.emit(airdrop, "WelcomeAirdropClaimed")
        .withArgs(addr1.address, claimAmount);

      // Balance check
      expect(await token.balanceOf(addr1.address)).to.equal(claimAmount);
      expect(await airdrop.hasClaimedWelcome(addr1.address)).to.equal(true);
    });

    it("Should fail if a user tries to claim twice", async function () {
      const { airdrop, addr1 } = await deployAirdropFixture();

      // First claim
      await airdrop.connect(addr1).claimWelcomeAirdrop();

      // Second claim
      await expect(
        airdrop.connect(addr1).claimWelcomeAirdrop()
      ).to.be.revertedWith("Airdrop already claimed");
    });

    it("Should fail if the contract runs out of tokens", async function () {
      const { token, airdrop, addr1 } = await deployAirdropFixture();

      // Withdraw all tokens from the airdrop contract to empty it
      const bal = await token.balanceOf(airdrop.target);
      await airdrop.withdrawTokens(bal);

      // Claim should fail
      await expect(
        airdrop.connect(addr1).claimWelcomeAirdrop()
      ).to.be.revertedWith("Insufficient tokens in airdrop pool");
    });
  });

  describe("Token Purchase & 10% Bonus", function () {
    it("Should calculate and transfer CTX + 10% bonus when buying with BNB", async function () {
      const { airdrop, token, addr1, decimals } = await deployAirdropFixture();
      const bnbAmount = ethers.parseEther("0.1"); // 0.1 BNB
      
      // Default rate: 1 BNB = 1,000,000 CTX
      // 0.1 BNB = 100,000 CTX
      // 10% bonus = 10,000 CTX
      // Total expected = 110,000 CTX
      const expectedBase = 100_000n * (10n ** decimals);
      const expectedBonus = 10_000n * (10n ** decimals);
      const expectedTotal = expectedBase + expectedBonus;

      await expect(
        airdrop.connect(addr1).buyTokens({ value: bnbAmount })
      )
        .to.emit(airdrop, "TokensPurchased")
        .withArgs(addr1.address, bnbAmount, expectedBase, expectedBonus);

      expect(await token.balanceOf(addr1.address)).to.equal(expectedTotal);
    });

    it("Should support direct BNB transfers using receive()", async function () {
      const { airdrop, token, addr2, decimals } = await deployAirdropFixture();
      const bnbAmount = ethers.parseEther("0.05"); // 0.05 BNB

      // 0.05 BNB = 50,000 CTX + 5,000 CTX bonus = 55,000 CTX total
      const expectedTotal = 55_000n * (10n ** decimals);

      await expect(
        addr2.sendTransaction({ to: airdrop.target, value: bnbAmount })
      ).to.emit(airdrop, "TokensPurchased");

      expect(await token.balanceOf(addr2.address)).to.equal(expectedTotal);
    });

    it("Should fail if no BNB is sent", async function () {
      const { airdrop, addr1 } = await deployAirdropFixture();
      await expect(
        airdrop.connect(addr1).buyTokens({ value: 0 })
      ).to.be.revertedWith("Send BNB to buy tokens");
    });
  });

  describe("Admin & Configuration Features", function () {
    it("Should allow the owner to update rates", async function () {
      const { airdrop, token, addr1, decimals } = await deployAirdropFixture();

      // Change rate to: 1 BNB = 2,000,000 CTX, 20% bonus
      await airdrop.setRates(2_000_000, 20);

      expect(await airdrop.tokensPerBNB()).to.equal(2_000_000);
      expect(await airdrop.bonusPercent()).to.equal(20);

      // Buy with 0.1 BNB
      // 0.1 BNB = 200,000 CTX
      // 20% bonus = 40,000 CTX
      // Total expected = 240,000 CTX
      const bnbAmount = ethers.parseEther("0.1");
      const expectedTotal = 240_000n * (10n ** decimals);

      await airdrop.connect(addr1).buyTokens({ value: bnbAmount });
      expect(await token.balanceOf(addr1.address)).to.equal(expectedTotal);
    });

    it("Should allow the owner to update the welcome airdrop size", async function () {
      const { airdrop, decimals } = await deployAirdropFixture();
      const newAmount = 250n * (10n ** decimals);

      await airdrop.setWelcomeAirdropAmount(newAmount);
      expect(await airdrop.welcomeAirdropAmount()).to.equal(newAmount);
    });

    it("Should allow the owner to withdraw BNB raised from sales", async function () {
      const { airdrop, owner, addr1 } = await deployAirdropFixture();
      const buyValue = ethers.parseEther("0.5");

      // Buy tokens to accumulate BNB in contract
      await airdrop.connect(addr1).buyTokens({ value: buyValue });

      const contractBnbBal = await ethers.provider.getBalance(airdrop.target);
      expect(contractBnbBal).to.equal(buyValue);

      // Withdraw BNB
      const ownerBnbBefore = await ethers.provider.getBalance(owner.address);
      const tx = await airdrop.withdrawBNB();
      const receipt = await tx.wait();
      const gasUsed = receipt.gasUsed * receipt.gasPrice;

      const ownerBnbAfter = await ethers.provider.getBalance(owner.address);
      expect(ownerBnbAfter).to.equal(ownerBnbBefore + buyValue - gasUsed);
    });

    it("Should allow the owner to withdraw unspent CTX tokens", async function () {
      const { airdrop, token, owner, fundAmount } = await deployAirdropFixture();

      const ownerBalBefore = await token.balanceOf(owner.address);
      await airdrop.withdrawTokens(fundAmount);

      expect(await token.balanceOf(airdrop.target)).to.equal(0);
      expect(await token.balanceOf(owner.address)).to.equal(ownerBalBefore + fundAmount);
    });

    it("Should reject administrative updates or withdrawals from non-owners", async function () {
      const { airdrop, addr1 } = await deployAirdropFixture();

      await expect(
        airdrop.connect(addr1).setRates(100, 10)
      ).to.be.revertedWithCustomError(airdrop, "OwnableUnauthorizedAccount");

      await expect(
        airdrop.connect(addr1).setWelcomeAirdropAmount(100)
      ).to.be.revertedWithCustomError(airdrop, "OwnableUnauthorizedAccount");

      await expect(
        airdrop.connect(addr1).withdrawBNB()
      ).to.be.revertedWithCustomError(airdrop, "OwnableUnauthorizedAccount");

      await expect(
        airdrop.connect(addr1).withdrawTokens(100)
      ).to.be.revertedWithCustomError(airdrop, "OwnableUnauthorizedAccount");
    });
  });
});
