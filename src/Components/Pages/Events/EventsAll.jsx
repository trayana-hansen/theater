import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EventsAll.scss";
import { Link } from "react-router-dom";

const EventsAll = () => {
  const [allEvents, setAllEvents] = useState([]);
  const formatDate = (dateNew) => {
    const date = new Date(dateNew);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("da-DK", options);
  };

  useEffect(() => {
    const url = `http://localhost:4000/events?orderby=startdate&dir=DESC&attributes=id,title,image,startdate,stopdate`;

    const getData = async () => {
      try {
        const result = await axios.get(url);
        console.log(result);
        setAllEvents(result.data);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, [setAllEvents]);

  return (
    <>
      <div className="allEventsWrapper">
        {allEvents &&
          allEvents.map((data) => {
            console.log(data);
            return (
              <div key={data.id} className="singleEvent">
                <div className="imgEvent">
                  <img
                    src={`http://localhost:4000/Assets/Images/events/small/${data.image}`}
                    alt={data.title}
                  />
                </div>
                <h2>{data.title}</h2>

                <div id="detailsEvent">
                  <p>{data.stage.name}</p>
                  <p id="date">
                    {formatDate(data.startdate)} - {formatDate(data.stopdate)}
                  </p>
                </div>

                <div className="buttons">
                  <button className="readMore">
                    <Link to={`/events/${data.id}`}>LÆS MERE</Link>
                  </button>
                  <button className="ticket">KØB BILLET</button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default EventsAll;
