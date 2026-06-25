require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// Fallback dummy private key if no .env file exists (prevents Hardhat from crashing on compile)
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0000000000000000000000000000000000000000000000000000000000000000";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    // Local Hardhat Network (default for test runs)
    hardhat: {},
    
    // BNB Smart Chain (BSC) Testnet
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      accounts: [PRIVATE_KEY],
    },
    
    // BNB Smart Chain (BSC) Mainnet - REAL network
    bscMainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      accounts: [PRIVATE_KEY],
    },
  },
};
