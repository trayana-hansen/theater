import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import Actors from "../../Pages/Actors/Actors";
import Events from "../../Pages/Events/Events";
import NotFound from "../../Pages/NotFound/NotFound";

/* Creating a react component */
const AppRouter = () => {
  return (
    <Routes>
      {/* Defining the home page of the website */}
      <Route index element={<Home />} />

      {/* Route to events page */}
      <Route path="/events" element={<Events />} />

      {/* Routes to actors and login */}
      <Route path="/actors" element={<Actors />} />
      <Route path="/login" element={<Login />} />

      {/* Routing to a 404 page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
/* Exporting the component to be reused*/
export default AppRouter;
