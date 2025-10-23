//SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

// Organizer creates an Event and give out tickets. Anyone can buy tickets to the event.
contract EventOrganizer {

    address public owner;

    struct Event {
        string eventName;
        uint256 id;
        address organiser;
        uint256 totalTickets;
        uint256 ticketsRemaining;
        uint256 price;
        uint256 date;
    }

    mapping(uint256 => Event) public events;
    Event[] allEvents;
    uint256 eventId;
    // to store the tickets an address has bought for a particular event
    mapping(address => mapping(uint256 => uint256)) public tickets;

    constructor() {
        owner = msg.sender; 
    } 

    function createEvent(string memory _eventName, uint256 _price, uint256 _totalTickets, uint256 _date) public {
        require(msg.sender == owner, "Only the owner can create the events");
        // date should be after the time of event creation. if event is created on 10th june, then date of event should be after this date.
        require(block.timestamp < _date, "The event cannot be in the past");
        require(_totalTickets > 0, "event should have atleast 1 ticket");
        require(_price > 0, "ticket price should be more than 0");
        events[eventId] = Event(_eventName, eventId, msg.sender, _totalTickets, _totalTickets, _price, _date);
        allEvents.push(Event(_eventName, eventId, msg.sender, _totalTickets, _totalTickets, _price, _date));
        eventId++;
    }

    function buyTickets(uint256 _eventId, uint256 _quantity) public payable {
        require(_quantity > 0, "you need to buy atleast 1 ticket");
        require(msg.value >= (events[_eventId].price * _quantity), "pay full amount for the number of tickets you want to buy");
        require(events[_eventId].date > block.timestamp, "event has already passed.");
        require(events[_eventId].ticketsRemaining >= _quantity, "not enough tickets left");
        tickets[msg.sender][_eventId] += _quantity;
        events[_eventId].ticketsRemaining -= _quantity;
        allEvents[_eventId].ticketsRemaining = events[_eventId].ticketsRemaining;
    }

    function getEvents() public view returns(Event[] memory) {
        return allEvents;
    }
}