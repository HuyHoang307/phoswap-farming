const hre = require("hardhat");
const { ethers, upgrades } = hre;

const { getContracts, saveContract } = require("./utils");

async function main() {
  const network = hre.network.name;
  const contracts = await getContracts(network)[network];

  // Parameters
  const phoPerBlock = "40000000000000000000"; // 100 HOTPOT per Block (ETH)
  const phoBlock = "10031542";
  console.log('pho: ', contracts.pho);
  console.log('dev: ', contracts.dev);

  const PhoSwapFarming = await hre.ethers.getContractFactory("PhoSwapFarming");
  const farm = await upgrades.deployProxy(PhoSwapFarming, [
    contracts.pho,
    contracts.dev,
    phoPerBlock,
    phoBlock,
  ]);

  await farm.deployed();
  await saveContract(network, "farm", farm.address);
  console.log(`Deployed PhoSwapFarming to ${farm.address}`);

  console.log("Completed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
