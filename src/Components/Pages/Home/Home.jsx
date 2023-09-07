import React from "react";
import "./Home.scss";
import EventCard from "../Home/EventCard";
import Hero from "../../Partials/Hero/Hero";

const Home = () => {
  return (
    <div>
      <Hero />
      <EventCard />
    </div>
  );
};

export default Home;
