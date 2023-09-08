import "./EventDetails.scss";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const [data, setData] = useState([{}]);
  const { event_id } = useParams();

  const formatDate = (dateNew) => {
    const date = new Date(dateNew);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("da-DK", options);
  };

  useEffect(() => {
    const url = `http://localhost:4000/events/${event_id}`;

    const getData = async () => {
      try {
        const result = await axios.get(url);
        console.log(result);
        setData(result.data);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, [event_id]);

  return (
    <>
      <div className="eventDetWrap">
        {data && (
          <figure key={event_id} className="eventDetFig">
            <div>
              <img
                src={`http://localhost:4000/Assets/Images/events/medium/${data.image}`}
                alt={data.title}
              />
            </div>
            <div id="detailsEvent">
              <p>{data.stage.name}</p>
              <p id="date">
                {formatDate(data.startdate)} - {formatDate(data.stopdate)}
              </p>
              <p>Billetpris {data.price.toFixed(2)} dkk</p>
            </div>
            <h1>{data.title}</h1>
            <p>{data.genre.name}</p>

            <div className="buttons">
              <button className="ticket">KØB BILLET</button>
            </div>

            <p>{data.description}</p>
            <p>{data.duration_minutes} minutter</p>

            <h2>MEDVIRKENDE</h2>
            <div className="actorContainer">
              {data.actors &&
                data.actors.map((actor) => {
                  return (
                    <div key={actor.id} className="actorWrap">
                      <figure className="actorFigure">
                        <img
                          src={`http://localhost:4000/Assets/Images/actors/${actor.image}`}
                          alt={actor.name}
                        />
                        <p>{actor.name}</p>
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
