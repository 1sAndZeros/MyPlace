import "./WelcomePage.css";
import Navbar from "../Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main id="welcome-page" className="bg-main">
        <div className="welcome-page__message">
          <h1 className="welcome-page__heading">
            Beautiful Places of the world
          </h1>
          <p>Look back at memories and plan for the next ones</p>
        </div>
        <div className="welcome-page__map">
          <img
            src="/welcome-map.jpeg"
            alt="welcome-map"
            className="welcome-map"
          />
        </div>
      </main>
    </>
  );
}

export default App;
