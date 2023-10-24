import Navbar from "../Navbar/Navbar";
import MapView from "../mapView/mapView";
import Sidebar from "../Sidebar/Sidebar";
import { useState } from "react";

function App() {
  const [cityPins, setCityPins] = useState([]);

  return (
    <main id="home" className="bg-main">
      <Navbar />
      <div className="home__container">
        <div className="home__sidebar">
          <Sidebar setCityPins={setCityPins} />
        </div>
        <div className="home__map-container">
          <MapView cityPins={cityPins} setCityPins={setCityPins} />
        </div>
      </div>
    </main>
  );
}

export default App;
