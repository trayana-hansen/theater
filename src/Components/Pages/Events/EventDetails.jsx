import "./EventDetails.scss";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const EventDetails = () => {
  // State to store event data
  const [data, setData] = useState([{}]);

  // Get the `event_id` parameter from the route using `useParams` hook
  const { event_id } = useParams();

  // Function to format a date in a user-friendly format
  const formatDate = (dateNew) => {
    const date = new Date(dateNew);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("da-DK", options);
  };

  // Effect to fetch data when the component mounts or `event_id` changes
  useEffect(() => {
    // Construct the URL to fetch event details based on the `event_id`
    const url = `http://localhost:4000/events/${event_id}`;

    // Function to fetch event data from the API
    const getData = async () => {
      try {
        // Send a GET request to the API endpoint
        const result = await axios.get(url);

        // Log the result to the console for debugging
        console.log(result);

        // Update the `data` state with the received event data
        setData(result.data);
      } catch (err) {
        // Handle any errors by logging them to the console
        console.error(err);
      }
    };

    // Call the `getData` function to fetch event data
    getData();
  }, [event_id]); // Run the effect whenever `event_id` changes

  return (
    <>
      <div className="eventDetWrap">
        {data && (
          // Render event details if `data` is available
          <figure key={event_id} className="eventDetFig">
            <div className="imgDiv">
              {/* Display event's image */}
              <img
                id="eventImg"
                src={`http://localhost:4000/Assets/Images/events/medium/${data.image}`}
                alt={data.title}
              />
            </div>
            <div id="detailsEvent">
              <div>
                {/* Display event's stage name and date */}
                {data.stage ? <p>{data.stage.name}</p> : null}
                <p id="date">
                  {formatDate(data.startdate)} - {formatDate(data.stopdate)}
                </p>
              </div>
              <div>
                {/* Display event's ticket price */}
                <p id="price">Billetpris {data.price} dkk</p>
              </div>
            </div>
            <hr />
            <div id="genreInfo">
              <div>
                {/* Display event's title and genre */}
                <h1>{data.title}</h1>
                {data.genre ? <p id="genre">{data.genre.name}</p> : null}
              </div>

              <div className="buttons">
                {/* Create a link to purchase tickets */}
                <button className="ticket">
                  <Link to={`/tickets/${data.id}`}>KØB BILLET</Link>
                </button>
              </div>
            </div>

            <div id="description">
              {/* Display event's description and duration */}
              <p>{data.description}</p>
              <p>{data.duration_minutes} minutter</p>
            </div>

            <h2>MEDVIRKENDE</h2>
            <div className="actorContainer">
              {/* Map through actors and display their information */}
              {data.actors &&
                data.actors.map((actor) => {
                  return (
                    <div key={actor.id} className="actorWrap">
                      <figure className="actorFigure">
                        {/* Display actor's image */}
                        <img
                          src={`http://localhost:4000/Assets/Images/actors/${actor.image}`}
                          alt={actor.name}
                        />
                        {/* Display actor's name */}
                        {actor.name ? <p>{actor.name}</p> : null}
                      </figure>
                    </div>
                  );
                })}
            </div>
          </figure>
        )}
      </div>
    </>
  );
};

export default EventDetails;
