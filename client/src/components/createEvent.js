/* global BigInt */

const CreateEvent = ({state}) => {
    const Event = async (event) => {
        event.preventDefault();
        const {contract} = state;
        const name = document.querySelector("#name").value;
        const price = BigInt(document.querySelector("#price").value);
        const totalTickets = Number(document.querySelector("#total_tickets").value);
        const date = BigInt(document.querySelector("#event_date").value);
        console.log(name, price, totalTickets, date, contract);
        const transaction = await contract.createEvent(name, price, totalTickets, date);
        await transaction.wait();
        console.log("Event created!");
    };
    return (
        <> 
        <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
        <h4 style={{ textAlign: "center", marginTop: "40px", color: "black", fontWeight: "bold",}}>Add New Event</h4>
        <form onSubmit={Event}>
        <div className="mb-3">
        <label className="form-label">Event name</label>
        <input type="text" className="form-control" id="name" placeholder="Enter the Event name"></input></div>

        <div className="mb-3">
        <label className="form-label">Price</label>
        <input type="number" className="form-control" id="price" placeholder="Enter the ticket price"></input></div>

        <div className="mb-3">
        <label className="form-label">Total tickets</label>
        <input type="number" className="form-control" id="total_tickets" placeholder="Enter the number of total tickets"></input></div>

        <div className="mb-3">
        <label className="form-label">Event date</label>
        <input type="number" className="form-control" id="event_date" placeholder="Enter the date of event"></input></div>

        <button type= "submit" className="btn btn-primary">Create Event</button>
        </form>
        </div>
        </>
    );
};

export default CreateEvent;