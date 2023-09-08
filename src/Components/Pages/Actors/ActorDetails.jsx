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
      <div className="actorWrap">
        {data && (
          <div key={data.id} className="contentWrapper">
            <figure className="actorWrapper">
              <div className="imgWrapper">
                <img
                  src={`http://localhost:4000/Assets/Images/actors/${data.image}`}
                  alt={data.name}
                />
              </div>
              <figcaption className="info">
                <p>{data.name}</p>
                <p>{data.description}</p>
              </figcaption>
            </figure>
          </div>
        )}
      </div>
    </>
  );
};

export default ActorDetails;
