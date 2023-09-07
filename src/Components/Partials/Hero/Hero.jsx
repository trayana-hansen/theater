import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Hero.scss";

const Hero = () => {
  const [hero, setHero] = useState([]);
  const formatDate = (dateNew) => {
    const date = new Date(dateNew);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("da-DK", options);
  };

  useEffect(() => {
    const url = `http://localhost:4000/events?orderby=startdate&dir=DESC&limit=1&attributes=id,title,image,startdate,stopdate,genre_id`;

    const getData = async () => {
      try {
        const result = await axios.get(url);
        console.log(result);
        setHero(result.data);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, [setHero]);

  return (
    <>
      <div className="heroWrapper">
        {hero &&
          hero.map((data) => {
            console.log(data);
            return (
              <figure key={data.id} className="heroFigure">
                <div className="imgWrapper">
                  <img
                    src={`http://localhost:4000/Assets/Images/events/small/${data.image}`}
                    alt={data.title}
                  />
                </div>
                <div className="info">
                  <figcaption>
                    <p>{data.stage.name}</p>
                    <p id="date">
                      {formatDate(data.startdate)} -{formatDate(data.stopdate)}
                    </p>
                    <hr />

                    <h3>{data.title}</h3>
                    <p id="genre">{data.genre.name}</p>
                  </figcaption>
                </div>
              </figure>
            );
          })}
      </div>
    </>
  );
};

export default Hero;
