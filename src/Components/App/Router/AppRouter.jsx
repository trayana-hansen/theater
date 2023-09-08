import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import Actors from "../../Pages/Actors/Actors";
import Events from "../../Pages/Events/Events";
import NotFound from "../../Pages/NotFound/NotFound";
import EventDetails from "../../Pages/Events/EventDetails";
import ActorDetails from "../../Pages/Actors/ActorDetails";
import Tickets from "../../Pages/Tickets/Tickets";

/* Creating a react component */
const AppRouter = () => {
  return (
    <Routes>
      {/* Defining the home page of the website */}
      <Route index element={<Home />} />

      {/* Route to events page */}
      <Route path="/events">
        <Route index element={<Events />} />
        <Route path=":event_id" element={<EventDetails />} />
      </Route>

      {/* Routes to actors and login */}
      <Route path="/actors">
        <Route index element={<Actors />} />
        <Route path=":actor_id" element={<ActorDetails />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/tickets" element={<Tickets />} />

      {/* Routing to a 404 page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
/* Exporting the component to be reused*/
export default AppRouter;
