# Event Organization DApp
**A beginner-friendly decentralized app to create and manage event tickets using blockchain.**

This DApp allows event organizer (contract owner) to create events and users to purchase tickets securely using Ethereum blockchain. 

## 🚀 Live Demo
[Event Organizer DApp on Netlify](https://myeventorganizerdapp.netlify.app)

## Features
- **Event creation** by contract owner
- **Ticket purchase** by users with ETH
- Anyone can view **all the Events created** on-chain
- Owner can **view** who purchased how many tickets

## Tech Stack

| Layer | Technology |
|-------|-------------|
| Smart Contracts | Solidity |
| Blockchain Development | Hardhat |
| Blockchain Interaction | Ethers.js |
| Frontend | React.js, JavaScript |
| Wallet | MetaMask |
| Network | Sepolia Testnet |
| Hosting | Netlify |

## Getting Started
  
To get this DApp running, follow the steps below:
### Clone the Repository
```bash
git clone <repository-url>
cd event-organizer-dapp
```

### Contract Compilation and Deployment
1. Install Dependencies
```bash
npm install
```
2. Compile the contracts:
```bash
npx hardhat compile
```
3. Create a ```.env``` file:
- Mention the QuickNode Sepoli URL and your private key in the ```.env``` file.
4. Deploy the smart contract:
```bash
npx hardhat run scripts/finalDeploy.js --network <network-name>
```
Replace ```<network-name>``` with the desired network (e.g., Goerli, Sepoli).

### Frontend Setup
1. Ensure you have MetaMask installed in your browser.
2. Navigate to the ```client``` directory:
```bash
cd client
```
3. Install frontend dependencies:
```bash
npm install
```
4. Start the frontend server:
```bash
npm start
```

## Smart Contract
Key functionalities:
- createEvent: Organizer creates a new event with name, price, total tickets, and date.
- buyTickets: Users can purchase tickets for available events by paying ETH.
- getEvents: Returns the list of all created events.
- tickets mapping: Tracks how many tickets each address has bought per event.
