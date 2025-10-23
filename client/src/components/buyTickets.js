/* global BigInt */

// no need of useState and useEffect, because these are entered by user in a form and are temporary which are handled by functions and read directly on submit button
const Buy = ({state}) => {
    const buyTicket = async (event) => {
        event.preventDefault();
        const {contract} = state;
        const eventId = Number(document.querySelector("#id").value);
        const quantity = Number(document.querySelector("#quantity").value);
        console.log(eventId, quantity, contract);
        const eventData = await contract.events(eventId);
        if (!eventData.eventName) {
            alert(`Event ID ${eventId} does not exist.`);
            return;
        }
        const remainingTickets = Number(eventData.ticketsRemaining);
        if (remainingTickets < quantity) {
            alert(`Not enough tickets. Only ${remainingTickets} tickets available!`);
            return;
        }
        const price = eventData.price;
        const amount = price * BigInt(quantity);
        console.log("Total cost (wei):", amount.toString());
        const transaction = await contract.buyTickets(eventId, quantity, {value: amount});
        await transaction.wait();
        console.log("Tickets purchased");

    };
    return (<>
        <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
        <h4 style={{ textAlign: "center", marginTop: "40px", color: "black", fontWeight: "bold",}}>Buy Tickets for an Event</h4>
        <form onSubmit={buyTicket}>
        <div className="mb-3"><label className="form-label">Event Id</label>
        <input type="number" className="form-control" id="id" placeholder="Enter the Event Id"></input></div>
        <div className="mb-3"><label className="form-label">Quantity</label>
        <input type="number" className="form-control" id="quantity" placeholder="Enter the number of tickets"></input></div>
        <button type= "submit" className="btn btn-primary">Buy</button>
        </form>
        </div>
    </>);
};

export default Buy;