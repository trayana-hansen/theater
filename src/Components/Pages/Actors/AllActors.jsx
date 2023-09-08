import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllActors.scss";
import { Link } from "react-router-dom";

const AllActors = () => {
  const [allActors, setAllActors] = useState([]);

  useEffect(() => {
    const url = `http://localhost:4000/actors?orderby=name&dir=asc&attributes=id,name, description, image`;

    const getData = async () => {
      try {
        const result = await axios.get(url);
        console.log(result);
        setAllActors(result.data);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, [setAllActors]);

  return (
    <>
      <div className="allActorsWrapper">
        <h1>Skuespillere</h1>
        {allActors &&
          allActors.map((data) => {
            console.log(data);

            return (
              <div key={data.id} className="actorCard">
                <div className="imgEvent">
                  <img
                    src={`http://localhost:4000/Assets/Images/actors/${data.image}`}
                    alt={data.name}
                  />
                </div>

                <div class="infoActor">
                  <h2>{data.name}</h2>
                  <p>{data.description}</p>
                </div>

                <div className="button">
                  <button className="readMore">
                    <Link to={`/actors/${data.id}`}>LÆS MERE</Link>
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default AllActors;
