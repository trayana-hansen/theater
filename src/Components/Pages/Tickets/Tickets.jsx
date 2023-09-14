import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../App/Auth/AuthProvider";

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

  const { loginData } = useAuth();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    try {
      let res = await fetch("http://localhost:4000/reservations", {
        method: "POST",
        body: JSON.stringify({
          event_id: event_id,
          firstname: firstname,
          lastname: lastname,
          email: email,
          address: address,
          zipcode: zipcode,
          city: city,
        }),
        headers: {
          Authorization: `Bearer ${loginData.access_token}`,
        },
      });

      if (res.status === 200) {
        setFirstName("");
        setLastName("");
        setEmail("");
        setAddress("");
        setZipcode("");
        setCity("");

        setMessage("Reservation bekræftet");
      } else {
        setMessage("Fejl opståede ved bekræftelset");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="reservation">
      <form onSubmit={handleSubmit}>
        <label>
          Fornavn:
          <input
            type="text"
            name="firstname"
            value={firstname}
            placeholder="Fornavn"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Efternavn:
          <input
            type="text"
            name="lastname"
            value={lastname}
            placeholder="Efternavn"
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Vejnavn og nr
          <input
            type="text"
            name="address"
            value={address}
            placeholder="Vejnavn og nr"
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label>
          Postnr:
          <input
            type="number"
            name="zipcode"
            value={zipcode}
            placeholder="Postnr"
            onChange={(e) => setZipcode(e.target.value)}
          />
        </label>
        <label>
          By
          <input
            type="text"
            name="city"
            value={city}
            placeholder="By"
            onChange={(e) => setCity(e.target.value)}
          />
        </label>

        <button type="submit">GODKENDT BESTILLING</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
};

export default Tickets;
