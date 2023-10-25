import Navbar from "../Navbar/Navbar";
import MapView from "../MapView/MapView";
import Sidebar from "../Sidebar/Sidebar";
import { useState } from "react";

function HomePage() {
  const [cityPins, setCityPins] = useState([]);
  const [friend, setFriend] = useState(null);

  return (
    <main id="home" className="bg-main">
      <Navbar setFriend={setFriend} setCityPins={setCityPins} />
      <div className="home__container">
        <div className="home__sidebar">
          <Sidebar
            setCityPins={setCityPins}
            friend={friend}
            setFriend={setFriend}
          />
        </div>
        <div className="home__map-container">
          <MapView
            cityPins={cityPins}
            setCityPins={setCityPins}
            friend={friend}
          />
        </div>
      </div>
    </main>
  );
}

export default HomePage;
