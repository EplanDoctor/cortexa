const hre = require("hardhat");

async function main() {
    const airdropAddress = "0x09384b43f90F73377e607136d23621eBA66482cd";
    
    const [deployer] = await hre.ethers.getSigners();
    
    console.log("Interacting with contracts using the account:", deployer.address);
    console.log("Airdrop Contract Address:", airdropAddress);
    
    const CortexaAirdrop = await hre.ethers.getContractFactory("CortexaAirdrop");
    const airdropContract = CortexaAirdrop.attach(airdropAddress);
    
    console.log("Setting new rates: 1 BNB = 10,000 CTX, Bonus = 10%...");
    
    // setRates(uint256 _tokensPerBNB, uint256 _bonusPercent)
    const tx = await airdropContract.setRates(10000, 10);
    
    console.log("Transaction hash:", tx.hash);
    console.log("Waiting for block confirmation...");
    
    await tx.wait();
    
    console.log("Rates updated successfully on BSC Mainnet!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
