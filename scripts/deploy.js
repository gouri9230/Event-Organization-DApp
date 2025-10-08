import {network} from "hardhat";

const { ethers } = await network.connect();

async function main() {
    const [owner, addr1] = await ethers.getSigners();
    const address = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
    const abi = [{
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_eventId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_quantity",
            "type": "uint256"
          }
        ],
        "name": "buyTickets",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_eventName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "_price",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_totalTickets",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_date",
            "type": "uint256"
          }
        ],
        "name": "createEvent",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "events",
        "outputs": [
          {
            "internalType": "string",
            "name": "eventName",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "organiser",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "totalTickets",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "ticketsRemaining",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "date",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "tickets",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }];

    console.log(`Address of contract: ${address}`);
    const contract = new ethers.Contract(address, abi, owner);
    const event0 = await contract.events(0);
    console.log("Event 0:", {
        name: event0.eventName,
        remaining: event0.ticketsRemaining.toString(),  // Should be 45
        price: event0.price.toString()
      });
    console.log("Tickets for buyer:", (await contract.tickets(addr1.address, 0)).toString())
}

main()
.then(()=> process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});