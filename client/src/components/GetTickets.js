const Tickets = ({state}) => {
    const GetTickets = async (event)=> {
        event.preventDefault();
        const {contract} = state;
        const address = document.querySelector('#address').value;
        const id = Number(document.querySelector('#id').value);
        const ticketsData = await contract.tickets(address, id);
        if (Number(ticketsData) === 0) {
            alert(`Either tickets were not purchased for this event id or invalid event id or buyer address`);
        }
        else {
            alert(`This buyer has purchased ${Number(ticketsData)} tickets`);
        }
    };

    return (
        <>
        <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
        <h4 style={{ textAlign: "center", marginTop: "40px", color: "black", fontWeight: "bold",}}>Tickets purchased</h4>
        <form onSubmit={GetTickets}>
        <div className="mb-3"><label className="form-label">Buyer Address</label>
        <input type="text" className="form-control" id="address" placeholder="Enter the Buyer Address"></input></div>
        <div className="mb-3"><label className="form-label">Event Id</label>
        <input type="number" className="form-control" id="id" placeholder="Enter the event id"></input></div>
        <button type="submit" className="btn btn-primary">Check</button>
        </form>
        </div>
    </>
    )

};

export default Tickets;