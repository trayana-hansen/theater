import React from "react";
import "./App.scss";
import NavBar from "./Components/Partials/Nav/NavBar";
import AppRouter from "./Components/App/Router/AppRouter";
import Footer from "./Components/Partials/Footer/Footer";

const App = () => {
  return (
    <div>
      <NavBar />
      <AppRouter />
      <Footer />
    </div>
  );
};

export default App;
