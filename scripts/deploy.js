const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const targetWallet = "0xa1d7Be1ef8d8C7D607309f9476aC35F685802D41";

  console.log("====================================================");
  console.log("Deploying Cortexa smart contracts...");
  console.log("Deployer Address (Paying Gas):", deployer.address);
  console.log("Target Owner Wallet (Your Wallet):", targetWallet);
  
  // Fetch deployer's balance
  const provider = ethers.provider;
  const balance = await provider.getBalance(deployer.address);
  console.log("Deployer BNB Balance:", ethers.formatEther(balance));
  console.log("====================================================");

  if (balance === 0n) {
    throw new Error("Deployer wallet has 0 BNB. Please fund the deployer wallet with some BNB to pay for gas.");
  }

  // 1. Deploy CortexaToken
  console.log("Deploying CortexaToken...");
  const token = await ethers.deployContract("CortexaToken");
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log(`CortexaToken deployed to: ${tokenAddress}`);

  // 2. Deploy CortexaAirdrop
  console.log("Deploying CortexaAirdrop...");
  const airdrop = await ethers.deployContract("CortexaAirdrop", [tokenAddress]);
  await airdrop.waitForDeployment();
  const airdropAddress = await airdrop.getAddress();
  console.log(`CortexaAirdrop deployed to: ${airdropAddress}`);

  // 3. Exclude CortexaAirdrop from fees
  console.log("Excluding CortexaAirdrop from transfer fees...");
  const excludeTx = await token.setExcludedFromFee(airdropAddress, true);
  await excludeTx.wait();
  console.log("CortexaAirdrop excluded from fees successfully.");

  // 4. Fund CortexaAirdrop with 100,000,000 CTX (10% of total supply)
  console.log("Funding CortexaAirdrop with 100,000,000 CTX...");
  const decimals = await token.decimals();
  const airdropFundAmount = 100_000_000n * (10n ** decimals);
  const fundTx = await token.transfer(airdropAddress, airdropFundAmount);
  await fundTx.wait();
  console.log("Funding transaction completed.");

  // 5. Transfer remaining 900,000,000 CTX to your SafePal Wallet
  console.log(`Transferring remaining 900,000,000 CTX to ${targetWallet}...`);
  const remainingAmount = 900_000_000n * (10n ** decimals);
  const transferTx = await token.transfer(targetWallet, remainingAmount);
  await transferTx.wait();
  console.log("Transfer completed.");

  // 6. Set your wallet as the Marketing Wallet (receives 2% tax)
  console.log(`Setting Marketing Wallet to ${targetWallet}...`);
  const setMarketingTx = await token.setMarketingWallet(targetWallet);
  await setMarketingTx.wait();
  console.log("Marketing wallet updated.");

  // 7. Transfer contract ownerships to your SafePal Wallet
  console.log(`Transferring ownership of CortexaToken to ${targetWallet}...`);
  const transferTokenOwnershipTx = await token.transferOwnership(targetWallet);
  await transferTokenOwnershipTx.wait();
  console.log("CortexaToken ownership transferred.");

  console.log(`Transferring ownership of CortexaAirdrop to ${targetWallet}...`);
  const transferAirdropOwnershipTx = await airdrop.transferOwnership(targetWallet);
  await transferAirdropOwnershipTx.wait();
  console.log("CortexaAirdrop ownership transferred.");

  console.log("====================================================");
  console.log("DEPLOYMENT COMPLETED SUCCESSFULLY!");
  console.log("----------------------------------------------------");
  console.log(`Token Address:       ${tokenAddress}`);
  console.log(`Airdrop Address:     ${airdropAddress}`);
  console.log(`Tokens Sent to You:  900,000,000 CTX`);
  console.log(`Contracts Owner:     ${targetWallet}`);
  console.log(`Marketing Wallet:    ${targetWallet}`);
  console.log("====================================================");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
