import React from "react";
import "./App.scss";
import NavBar from "./Components/Partials/Nav/NavBar";
import AppRouter from "./Components/App/Router/AppRouter";
import Footer from "./Components/Partials/Footer/Footer";
import { Container } from "./Components/Styles/Container.style.js";

const App = () => {
  return (
    <div>
      <Container maxwidth="1000">
        <NavBar />
        <AppRouter />
        <Footer />
      </Container>
    </div>
  );
};

export default App;
