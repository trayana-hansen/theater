import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllActors.scss";
import { Link } from "react-router-dom";

const AllActors = () => {
  // State to store all actor data
  const [allActors, setAllActors] = useState([]);

  // Effect to fetch data when the component mounts or when setAllActors changes
  useEffect(() => {
    // Construct the URL to fetch all actors with specific attributes
    const url = `http://localhost:4000/actors?orderby=name&dir=asc&attributes=id,name,description,image`;

    // Function to fetch all actors' data from the API
    const getData = async () => {
      try {
        // Send a GET request to the API endpoint
        const result = await axios.get(url);

        // Log the result to the console for debugging
        console.log(result);

        // Update the `allActors` state with the received actor data
        setAllActors(result.data);
      } catch (err) {
        // Handle any errors by logging them to the console
        console.error(err);
      }
    };

    // Call the `getData` function to fetch all actor data
    getData();
  }, [setAllActors]); // Run the effect whenever `setAllActors` changes

  return (
    <>
      <div className="allActorsWrapper">
        <h1>Skuespillere</h1>
        {allActors &&
          allActors.map((data) => {
            console.log(data);

            return (
              // Render each actor's information
              <div key={data.id} className="actorCard">
                <div className="imgEvent">
                  {/* Display actor's image */}
                  <img
                    src={`http://localhost:4000/Assets/Images/actors/${data.image}`}
                    alt={data.name}
                  />
                </div>

                <div class="infoActor">
                  {/* Display actor's name */}
                  <h2>{data.name}</h2>
                  {/* Display actor's description */}
                  <p>{data.description}</p>
                </div>

                <div className="button">
                  <button className="readMore">
                    {/* Create a link to view actor details */}
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
