import "./homepage.css";
import Navbar from "../Navbar/Navbar";
import MapView from "../mapView/mapView";

function App() {
  return (
    <main id="home" className="bg-main">
      <Navbar />
      <div className="home__container">
        <div className="home__sidebar"></div>
        <div className="home__map-container">
          <MapView />
        </div>
      </div>
    </main>
  );
}

export default App;
