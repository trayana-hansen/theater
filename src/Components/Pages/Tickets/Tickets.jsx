import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Tickets = () => {
    // State to store event data
    const [data, setData] = useState([{}]);

    // Get the `event_id` parameter from the route using `useParams` hook
    const { event_id } = useParams();

    // Function to format a date in a user-friendly format
    const formatDate = (dateNew) => {
      const date = new Date(dateNew);
      const options = { day: "2-digit", month: "short", year: "numeric" };
      return date.toLocaleDateString("da-DK", options);
    };

    // Effect to fetch data when the component mounts or `event_id` changes
    useEffect(() => {
      // Construct the URL to fetch event details based on the `event_id`
      const url = `http://localhost:4000/events/${event_id}`;

      // Function to fetch event data from the API
      const getData = async () => {
        try {
          // Send a GET request to the API endpoint
          const result = await axios.get(url);

          // Log the result to the console for debugging
          console.log(result);

          // Update the `data` state with the received event data
          setData(result.data);
        } catch (err) {
          // Handle any errors by logging them to the console
          console.error(err);
        }
      };

      // Call the `getData` function to fetch event data
      getData();
    }, [event_id]); // Run the effect whenever `event_id` changes
  return <h1>Tickets</h1>;
};

export default Tickets;


