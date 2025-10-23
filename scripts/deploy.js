import {network} from "hardhat";

const { ethers } = await network.connect();

async function main() {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const deployedContract = await ethers.deployContract("EventOrganizer");
    await deployedContract.waitForDeployment();
    const address = await deployedContract.target;
    console.log("EventOrganizer deployed to:", address);

    const createEvent0 = await deployedContract.connect(owner).createEvent("Hackathon", 5n, 50n, 1762529127n);
    await createEvent0.wait();
    console.log("Event created. Tx hash:", createEvent0.hash);

    const buyer1 = await deployedContract.connect(addr1).buyTickets(0n, 3n, {value: 15n});
    await buyer1.wait();
    console.log("Buy ticket event called by:", await addr1.getAddress());

    const buyer2 = await deployedContract.connect(addr2).buyTickets(0n, 5n, {value: 25n});
    await buyer2.wait();
    console.log("Buy ticket event called by:", await addr2.getAddress());

    const event0 = await deployedContract.events(0);
    console.log("Event 0:", {
        name: event0.eventName,
        organiser: event0.organiser,
        remaining: event0.ticketsRemaining.toString(),
        price: event0.price.toString()
      });
    const buyer = (await deployedContract.tickets(addr1.getAddress(), 0));
    console.log("Tickets purchased by buyer1:", buyer.toString());
    console.log("Tickets purchased by buyer2:", (await deployedContract.tickets(addr2.getAddress(), 0)).toString());
}

main()
.catch((console.error));