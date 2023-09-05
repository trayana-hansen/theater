import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//TODO write how many seconds to the front page
const NotFound = () => {
  /* Creating a variable to use as useNavigate hook */

  const navigate = useNavigate();
  useEffect(() => {
    /* Setting a timer before the navigation takes place */

    setTimeout(() => {
      /* Rerouting to home page after the times is done */

      navigate("/");
    }, 2000);
  }, []);
  return <h1>Siden blev ikke fundet</h1>;
};

export default NotFound;
