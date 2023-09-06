import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EventCard.scss";

const EventCard = () => {
  const [events, setEvents] = useState([]);
  const formatDate = (dateNew) => {
    const date = new Date(dateNew);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("da-DK", options);
  };

  useEffect(() => {
    const url = `http://localhost:4000/events?limit=3&attributes=id,title,description,image,duration_minutes,price,startdate,stopdate`;

    const getData = async () => {
      try {
        const result = await axios.get(url);
        console.log(result);
        setEvents(result.data);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, [setEvents]);

  return (
    <>
      <div className="eventWrapper">
        {events &&
          events.map((data) => {
            console.log(data);
            return (
              <figure key={data.id}>
                <div className="imgWrapper">
                  <img
                    src={`http://localhost:4000/Assets/Images/events/small/${data.image}`}
                    alt={data.title}
                  />
                </div>
                <figcaption>
                  <p>{data.stage.name}</p>
                  <p>
                    {formatDate(data.startdate)} -{formatDate(data.stopdate)}
                  </p>
                  <hr />

                  <h2>{data.title}</h2>
                  <div className="buttons">
                    <button className="readMore">LÆS MERE</button>
                    <button className="ticket">KØB BILLET</button>
                  </div>
                </figcaption>
              </figure>
            );
          })}
      </div>
      <button id="allEvents">SE ALLE FORESTILLINGER</button>
    </>
  );
};

export default EventCard;
