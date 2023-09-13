import React, { useState } from "react";

const Test = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:4000/reservations", {
        method: "POST",
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          email: email,
          address: address,
          zipcode: zipcode,
          city: city,
        }),
      });
      let resJson = await res.json();
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
        <label htmlFor="firstname">
          Fornavn:
          <input
            name="firstname"
            type="text"
            value={firstname}
            placeholder="Fornavn"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label htmlFor="lastname">
          Efternavn:
          <input
            name="lastname"
            type="text"
            value={lastname}
            placeholder="Efternavn"
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            name="email"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="address">
          Vejnavn og nr
          <input
            type="text"
            value={address}
            placeholder="Vejnavn og nr"
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label htmlFor="zipcode">
          Postnr:
          <input
            name="zipcode"
            type="number"
            value={zipcode}
            placeholder="Postnr"
            onChange={(e) => setZipcode(e.target.value)}
          />
        </label>
        <label htmlFor="city">
          By
          <input
            type="text"
            value={city}
            placeholder="By"
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <button type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
};
export default Test;
