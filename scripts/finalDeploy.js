import {network} from "hardhat";

const { ethers } = await network.connect()

async function main() {
    const deployedContract = await ethers.deployContract("EventOrganizer");
    await deployedContract.waitForDeployment();
    const address = await deployedContract.target;
    console.log("Contract address: ", address);
}

main()
.catch((console.error));