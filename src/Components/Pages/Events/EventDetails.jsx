import "./EventDetails.scss";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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
            <div className="imgDiv">
              <img
                id="eventImg"
                src={`http://localhost:4000/Assets/Images/events/medium/${data.image}`}
                alt={data.title}
              />
            </div>
            <div id="detailsEvent">
              <div>
                {data.stage ? <p>{data.stage.name}</p> : null}
                <p id="date">
                  {formatDate(data.startdate)} - {formatDate(data.stopdate)}
                </p>
              </div>
              <div>
                <p id="price">Billetpris {data.price} dkk</p>
              </div>
            </div>
            <hr />
            <div id="genreInfo">
              <div>
                <h1>{data.title}</h1>
                {data.genre ? <p id="genre">{data.genre.name}</p> : null}
              </div>

              <div className="buttons">
                <button className="ticket">
                  <Link to="/tickets">KØB BILLET</Link>
                </button>
              </div>
            </div>

            <div id="description">
              <p>{data.description}</p>
              <p>{data.duration_minutes} minutter</p>
            </div>

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
