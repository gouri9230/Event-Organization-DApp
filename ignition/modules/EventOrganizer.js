import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("EventOrganizerModule", (m) => {
  const myContract = m.contract("EventOrganizer");

  const owner = m.getAccount(0);  
  const addr1 = m.getAccount(1);
  const addr2 = m.getAccount(2);
  const createEvent0 = m.call(myContract, "createEvent", ["Hackathon", 10n, 50n, 1760973927n], {sender: owner});
  const buyer1 = m.call(myContract, "buyTickets", [0n, 5n], {id: "addr1Buyer", value: 50n, after: [createEvent0], sender: addr1});
  console.log("buy ticket event is called by: ", addr1);
  m.call(myContract, "buyTickets", [0n, 10n], {id: "addr2Buyer", value: 100n, after: [buyer1], sender: addr2});
  console.log("buy ticket event is called by: ", addr2);

  return { myContract };
});
