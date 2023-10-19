import { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import GeocoderControl from "./GeocoderControl";
import NewCityForm from "../NewCityForm/NewCityForm";
import { authApi } from "../../utils/api";

// get request for cities / regions https://api.mapbox.com/geocoding/v5/mapbox.places/{searchString}.json?fuzzyMatch=false&limit=10&types=region%2Cdistrict&autocomplete=true&access_token=pk.eyJ1IjoiaW15cGxhY2UiLCJhIjoiY2xudTViMGp3MGNwYTJsbzVtdnNxZ3NvOCJ9.j49LvpTufygf0Cx9HhldIg

const MapView = () => {
  const MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoiaW15cGxhY2UiLCJhIjoiY2xudTViMGp3MGNwYTJsbzVtdnNxZ3NvOCJ9.j49LvpTufygf0Cx9HhldIg";

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });
  const [marker, setMarker] = useState({
    latitude: null,
    longitude: null,
  });
  const [showPopup, setShowPopup] = useState(false);
  const [placeName, setPlaceName] = useState(null);
  const [cityPins, setCityPins] = useState([]);

  useEffect(() => {
    authApi.getCityPins().then((data) => {
      console.log(data);
      setCityPins(data.cities);
    });
  }, []);

  const handleClick = async (e) => {
    setShowPopup(() => false);
    setMarker(() => {
      return {
        latitude: e.lngLat.lat,
        longitude: e.lngLat.lng,
      };
    });
    setShowPopup(true);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.lngLat.lng},${e.lngLat.lat}.json?limit=1&types=region%2Cdistrict&access_token=${MAPBOX_ACCESS_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();
    setPlaceName(data.features[0].text);
  };

  const handleMarkerClick = (e) => {
    console.log(e);
  };

  return (
    <>
      <Map
        onViewportChange={setViewport}
        onClick={handleClick}
        initialViewState={{ ...viewport }}
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <GeocoderControl
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
          position="top-right"
        />

        {cityPins.length > 0 &&
          cityPins.map((cityPin) => {
            return (
              <Marker
                key={cityPin._id}
                latitude={cityPin.location.lat}
                longitude={cityPin.location.lng}
              />
            );
          })}

        {marker.latitude && (
          <Marker
            latitude={marker.latitude}
            longitude={marker.longitude}
            onClick={handleMarkerClick}
            color="#ff0000"
          />
        )}
        {showPopup && (
          <Popup
            longitude={marker.longitude}
            latitude={marker.latitude}
            anchor="bottom-left"
            onClose={() => setShowPopup(false)}
            className="popup-container"
            offset={[15, -25]}
          >
            <NewCityForm
              marker={marker}
              setMarker={setMarker}
              placeName={placeName}
              setPlaceName={setPlaceName}
              setShowPopup={setShowPopup}
              setCityPins={setCityPins}
            />
          </Popup>
        )}
      </Map>
    </>
  );
};

export default MapView;
