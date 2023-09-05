import "./App.scss";
import NavBar from "./Components/Partials/Nav/NavBar";
import AppRouter from "./Components/App/Router/AppRouter";
import Footer from "./Components/Partials/Footer/Footer.";

const App = () => {
  return (
    <>
      <div className="App">
        <NavBar />
        <AppRouter />
        <Footer />
      </div>
    </>
  );
};

export default App;
