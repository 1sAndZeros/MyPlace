import "./WelcomePage.css";
import Navbar from "../Navbar/Navbar";

function App() {
  return (
    <>
      <main id="welcome-page" className="bg-main">
        <Navbar />
        <div className="welcome-page__container">
          <div className="welcome-page__message text-image">
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
        </div>
      </main>
    </>
  );
}

export default App;
