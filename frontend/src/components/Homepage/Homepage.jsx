import "./homepage.css";
import Navbar from "../Navbar/Navbar";
import MapView from "../mapView/mapView";
import Sidebar from "../Sidebar/Sidebar";

function App() {
  return (
    <main id="home" className="bg-main">
      <Navbar />
      <div className="home__container">
        <div className="home__sidebar">
          <Sidebar />
        </div>
        <div className="home__map-container">
          <MapView />
        </div>
      </div>
    </main>
  );
}

export default App;
