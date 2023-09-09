import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Hero.scss";

const Hero = () => {
  // State to store hero event data
  const [hero, setHero] = useState([]);

  // Function to format a date in a user-friendly format
  const formatDate = (dateNew) => {
    const date = new Date(dateNew);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("da-DK", options);
  };

  // Effect to fetch data when the component mounts or when `setHero` changes
  useEffect(() => {
    // Construct the URL to fetch the most recent event with specific attributes
    const url = `http://localhost:4000/events?orderby=startdate&dir=DESC&limit=1&attributes=id,title,image,startdate,stopdate,genre_id`;

    // Function to fetch hero event data from the API
    const getData = async () => {
      try {
        // Send a GET request to the API endpoint
        const result = await axios.get(url);

        // Log the result to the console for debugging
        console.log(result);

        // Update the `hero` state with the received hero event data
        setHero(result.data);
      } catch (err) {
        // Handle any errors by logging them to the console
        console.error(err);
      }
    };

    // Call the `getData` function to fetch hero event data
    getData();
  }, [setHero]); // Run the effect whenever `setHero` changes

  return (
    <>
      <div className="heroWrapper">
        {hero &&
          hero.map((data) => {
            console.log(data);
            return (
              // Render the hero event's information
              <figure key={data.id} className="heroFigure">
                <div className="info">
                  <figcaption>
                    <p>{data.stage.name}</p>
                    <p id="date">
                      {/* Display event's stage name and date */}
                      {formatDate(data.startdate)} - {formatDate(data.stopdate)}
                    </p>
                    <hr />

                    <h3>{data.title}</h3>
                    <p id="genre">{data.genre.name}</p>
                  </figcaption>
                </div>
                <div className="imgWrapper">
                  {/* Display event's image */}
                  <img
                    src={`http://localhost:4000/Assets/Images/events/small/${data.image}`}
                    alt={data.title}
                  />
                </div>
              </figure>
            );
          })}
      </div>
    </>
  );
};

export default Hero;
