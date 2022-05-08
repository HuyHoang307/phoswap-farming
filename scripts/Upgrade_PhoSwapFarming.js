const hre = require('hardhat');
const { ethers, upgrades } = hre;

const { getContracts, saveContract } = require('./utils')

async function main() {
    const network = hre.network.name;
    const contracts = await getContracts(network)[network];

    const PhoSwapFarming = await hre.ethers.getContractFactory("PhoSwapFarming");
    const farm = await upgrades.upgradeProxy(contracts.farm, PhoSwapFarming);

    await farm.deployed();
    await saveContract(network, 'farm', farm.address);
    console.log(`Deployed PhoSwapFarming to ${farm.address}`);

    console.log('Completed!');
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });