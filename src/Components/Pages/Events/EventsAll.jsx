import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EventsAll.scss";
import { Link } from "react-router-dom";


const EventsAll = () => {
  // State to store all event data
  const [allEvents, setAllEvents] = useState([]);

  // Function to format a date in a user-friendly format
  const formatDate = (dateNew) => {
    const date = new Date(dateNew);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("da-DK", options);
  };

  // Effect to fetch data when the component mounts or when `setAllEvents` changes
  useEffect(() => {
    // Construct the URL to fetch all events with specific attributes
    const url = `http://localhost:4000/events?orderby=startdate&dir=DESC&attributes=id,title,image,startdate,stopdate`;

    // Function to fetch all events' data from the API
    const getData = async () => {
      try {
        // Send a GET request to the API endpoint
        const result = await axios.get(url);

        // Log the result to the console for debugging
        console.log(result);

        // Update the `allEvents` state with the received event data
        setAllEvents(result.data);
      } catch (err) {
        // Handle any errors by logging them to the console
        console.error(err);
      }
    };

    // Call the `getData` function to fetch all event data
    getData();
  }, [setAllEvents]); // Run the effect whenever `setAllEvents` changes

  return (
    <>
      <div className="allEventsWrapper">
        {allEvents &&
          allEvents.map((data) => {
            console.log(data);

            return (
              // Render each event's information
              <div key={data.id} className="singleEvent">
                <div className="imgEvent">
                  {/* Display event's image */}
                  <img
                    src={`http://localhost:4000/Assets/Images/events/small/${data.image}`}
                    alt={data.title}
                  />
                </div>
                {/* Display event's title */}
                <h2>{data.title}</h2>

                <div id="detailsEvent">
                  {/* Display event's stage name and date */}
                  <p>{data.stage.name}</p>
                  <p id="date">
                    {formatDate(data.startdate)} - {formatDate(data.stopdate)}
                  </p>
                </div>

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
              </div>
            );
          })}
      </div>
    </>
  );
};

export default EventsAll;
