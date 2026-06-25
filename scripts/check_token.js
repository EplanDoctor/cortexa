const { ethers } = require("hardhat");

async function main() {
  const tokenAddress = "0x52609c739d27dED4B81953b6a1f9c13C551f79a3";
  console.log("Querying token address:", tokenAddress);
  
  // Use BSC Mainnet provider
  const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
  
  try {
    const code = await provider.getCode(tokenAddress);
    if (code === "0x") {
      console.log("No contract code deployed at this address!");
      return;
    }
    
    const abi = [
      "function name() view returns (string)",
      "function symbol() view returns (string)",
      "function decimals() view returns (uint8)",
      "function totalSupply() view returns (uint256)"
    ];
    
    const contract = new ethers.Contract(tokenAddress, abi, provider);
    const name = await contract.name();
    const symbol = await contract.symbol();
    const decimals = await contract.decimals();
    const supply = await contract.totalSupply();
    
    console.log("=====================================");
    console.log("CONTRACT FOUND AND VERIFIED LIVE!");
    console.log("Name:", name);
    console.log("Symbol:", symbol);
    console.log("Decimals:", decimals);
    console.log("Total Supply:", ethers.formatUnits(supply, decimals), symbol);
    console.log("=====================================");
  } catch (e) {
    console.error("Error querying token:", e);
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
