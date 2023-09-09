import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./ActorDetails.scss";

const ActorDetails = () => {
  // State to store actor data
  const [data, setData] = useState([]);

  // Get the `actor_id` parameter from the route using `useParams` hook
  const { actor_id } = useParams();

  // Effect to fetch data when the component mounts or `actor_id` changes
  useEffect(() => {
    // Construct the URL to fetch actor details based on the `actor_id`
    const url = `http://localhost:4000/actors/${actor_id}`;

    // Function to fetch actor data from the API
    const getData = async () => {
      try {
        // Send a GET request to the API endpoint
        const result = await axios.get(url);

        // Log the result to the console for debugging
        console.log(result);

        // Update the `data` state with the received actor data
        setData(result.data);
      } catch (err) {
        // Handle any errors by logging them to the console
        console.error(err);
      }
    };

    // Call the `getData` function to fetch actor data
    getData();
  }, [actor_id]); // Run the effect whenever `actor_id` changes

  return (
    <>
      <div className="contentWrapper">
        <h1>Skuespillere</h1>
        {data && (
          // Render actor details if `data` is available
          <div key={data.id} className="actorWrap">
            <figure className="actorFig">
              <div className="imgWrapper">
                {/* Display actor's image */}
                <img
                  src={`http://localhost:4000/Assets/Images/actors/${data.image}`}
                  alt={data.name}
                />
              </div>
              <div className="info">
                {/* Display actor's name */}
                <p id="name">{data.name}</p>
                {/* Display actor's description */}
                <p id="description">{data.description}</p>
              </div>
            </figure>

            <div className="allActors">
              <button>
                {/* Create a link to view all actors */}
                <Link to="/actors">ALLE SKUESPILLERE</Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ActorDetails;
