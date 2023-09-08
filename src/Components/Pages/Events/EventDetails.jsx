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
      {data && (
        <div key={data.event_id}>
          <figure>
            <div>
              <img
                src={`http://localhost:4000/Assets/Images/events/medium/${data.image}`}
                alt={data.title}
              />
            </div>
            <div className="info">
              <div>
                <p>{data.stage.name}</p>
                <p id="date">
                  {formatDate(data.startdate)} - {formatDate(data.stopdate)}
                </p>
              </div>
              <div>Billetpris {data.price.toFixed(2)} dkk</div>
            </div>
            <div>
              <div>
                <h2> {data.title} </h2>
                <p>{data.genre.name}</p>
              </div>
              <div></div>
            </div>
          </figure>
        </div>
      )}
    </>
  );
};

export default EventDetails;
