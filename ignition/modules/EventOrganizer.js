import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("EventOrganizerModule", (m) => {
  const myContract = m.contract("EventOrganizer");

  const owner = m.getAccount(0);  
  const addr1 = m.getAccount(1);
  const createEvent0 = m.call(myContract, "createEvent", ["Hackathon", 10n, 50n, 1759961462n], {sender: owner});
  m.call(myContract, "buyTickets", [0n, 5n], {value: 50n, after: [createEvent0], sender: addr1});

  return { myContract };
});
