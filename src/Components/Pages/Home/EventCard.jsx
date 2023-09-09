import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EventCard.scss";
import { Link } from "react-router-dom";

const EventCard = () => {
  // State to store event data
  const [events, setEvents] = useState([]);

  // Function to format a date in a user-friendly format
  const formatDate = (dateNew) => {
    const date = new Date(dateNew);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("da-DK", options);
  };

  // Effect to fetch data when the component mounts or when `setEvents` changes
  useEffect(() => {
    // Construct the URL to fetch the most recent 3 events with specific attributes
    const url = `http://localhost:4000/events?orderby=startdate&dir=DESC&limit=3&attributes=id,title,description,image,duration_minutes,price,startdate,stopdate`;

    // Function to fetch event data from the API
    const getData = async () => {
      try {
        // Send a GET request to the API endpoint
        const result = await axios.get(url);

        // Log the result to the console for debugging
        console.log(result);

        // Update the `events` state with the received event data
        setEvents(result.data);
      } catch (err) {
        // Handle any errors by logging them to the console
        console.error(err);
      }
    };

    // Call the `getData` function to fetch event data
    getData();
  }, [setEvents]); // Run the effect whenever `setEvents` changes

  return (
    <>
      <div className="eventWrapper">
        {events &&
          events.map((data) => {
            console.log(data);
            return (
              // Render each event's information in a card
              <figure key={data.id} className="eventFigure">
                <div className="imgWrapper">
                  {/* Display event's image */}
                  <img
                    src={`http://localhost:4000/Assets/Images/events/small/${data.image}`}
                    alt={data.title}
                  />
                </div>
                <figcaption>
                  <p>{data.stage.name}</p>
                  <p>
                    {/* Display event's stage name and date */}
                    {formatDate(data.startdate)} - {formatDate(data.stopdate)}
                  </p>
                  <hr />

                  <h2>{data.title}</h2>
                  <div className="buttons">
                    {/* Create a link to view event details */}
                    <button className="readMore">
                      <Link to={`/events/${data.id}`}>LÆS MERE</Link>
                    </button>
                    {/* Create a link to purchase tickets */}
                    <button className="ticket">
                      <Link to="/tickets">KØB BILLET</Link>
                    </button>
                  </div>
                </figcaption>
              </figure>
            );
          })}
      </div>
      <div className="allEvents">
        {/* Create a link to view all events */}
        <button>
          <Link to={`/events`}>SE ALLE FORESTILLINGER</Link>
        </button>
      </div>
    </>
  );
};

export default EventCard;
