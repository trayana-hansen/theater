import "./ActorDetails.scss";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ActorDetails = () => {
  const [data, setData] = useState([]);
  const { actor_id } = useParams();

  useEffect(() => {
    const url = `http://localhost:4000/actors/${actor_id}`;

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
  }, [actor_id]);

  return (
    <>
      <div className="contentWrapper">
        <h1>Skuespillere</h1>
        {data && (
          <div key={data.id} className="actorWrap">
            <figure className="actorFig">
              <div className="imgWrapper">
                <img
                  src={`http://localhost:4000/Assets/Images/actors/${data.image}`}
                  alt={data.name}
                />
              </div>
              <div className="info">
                <p id="name">{data.name}</p>
                <p id="description">{data.description}</p>
              </div>
            </figure>
          </div>
        )}
      </div>
    </>
  );
};

export default ActorDetails;
