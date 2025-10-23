import { useState, useEffect } from "react";

const EventLists = ({state}) => {
    // we use useState whenever the component needs to remember some value that affects rendering. (Storing blockchain data)
    // UI automatically updates when the data changes.
    const [events, setEvents] = useState([]);
    const {contract} = state;
    // useEffect is like do something only once when the component is mounted. It re-runs only if its dependencies change
    // useEffect is code that should run after the component renders, (Fetching blockchain data, Listening to events emitted by smart contracts, calling APIs)
    useEffect(()=> {
        const eventDetails = async() => {
            const events = await contract.getEvents();
            //console.log("list of events: ", events);
            setEvents(events);
        };
        if (contract) eventDetails();
    }, [contract]);

    return (
        <div className="container-fluid" style={{ width: "100%" }}>
          {events.length === 0 ? (<p style={{ textAlign: "center", marginTop: "40px", color: "black", fontWeight: "bold",}}>No events created yet</p>) : ( <>
            <h4 style={{ textAlign: "center", marginTop: "40px", color: "black", fontWeight: "bold",}}>Events Details</h4>
            <table className="event-table">
            <thead>
            <tr>
              <th>Event Name</th>
              <th>Event Id</th>
              <th>Organiser</th>
              <th>Total Tickets</th>
              <th>Remaining Tickets</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, idx) => (
              <tr key={idx}>
                <td>{event.eventName}</td>
                <td>{event.id.toString()}</td>
                <td>{event.organiser}</td>
                <td>{event.totalTickets.toString()}</td>
                <td>{event.ticketsRemaining.toString()}</td>
                <td>{event.price.toString()}</td>
                <td>
                  {new Date(Number(event.date) * 1000).toLocaleDateString("en-GB")}
                </td>
              </tr>
            ))}
          </tbody>
            </table>
            </>
          )}
    </div>
    );
};
// if we call any contract function outside useEffect(), then every time state changes anywhere in the component tree, React re-runs the component function. (i.e EventLists), which means,
// that function is called again and again -> repeated blockchain calls -> slow, expensive.

export default EventLists;