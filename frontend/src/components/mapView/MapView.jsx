import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Map, {
  Marker,
  Popup,
  useMap,
  FullscreenControl,
  NavigationControl,
  GeolocateControl,
} from "react-map-gl";
import { AddressAutofill, SearchBox } from "@mapbox/search-js-react";
import "mapbox-gl/dist/mapbox-gl.css";
import NewCityForm from "../NewCityForm/NewCityForm";
import { authApi } from "../../utils/api";
import "./Map.css";

// get request for cities / regions https://api.mapbox.com/geocoding/v5/mapbox.places/{searchString}.json?fuzzyMatch=false&limit=10&types=region%2Cdistrict&autocomplete=true&access_token=pk.eyJ1IjoiaW15cGxhY2UiLCJhIjoiY2xudTViMGp3MGNwYTJsbzVtdnNxZ3NvOCJ9.j49LvpTufygf0Cx9HhldIg

const MapView = () => {
  const MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoiaW15cGxhY2UiLCJhIjoiY2xudTViMGp3MGNwYTJsbzVtdnNxZ3NvOCJ9.j49LvpTufygf0Cx9HhldIg";

  const navigate = useNavigate();
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 51.523375519247345,
    longitude: -0.0835492028568628,
    zoom: 4,
  });
  const [marker, setMarker] = useState({
    latitude: null,
    longitude: null,
  });
  const [showPopup, setShowPopup] = useState(false);
  const [placeName, setPlaceName] = useState(null);
  const [cityPins, setCityPins] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const myMap = useMap();
  const mapRef = useRef();

  useEffect(() => {
    authApi
      .getMyCityPins()
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.token);
        setCityPins(data.cities);
      })
      .catch((err) => {
        console.log(err);
        if (err.message === "auth error") {
          navigate("/");
        }
      });
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    myMap.current.flyTo({
      center: [e.lngLat.lng, e.lngLat.lat],
      duration: 3000, // Animate over 12 seconds
      essential: true, // This animation is considered essential with
      //respect to prefers-reduced-motion
      curve: 2,
    });
    setMarker(() => {
      return {
        latitude: e.lngLat.lat,
        longitude: e.lngLat.lng,
      };
    });
    setShowPopup(() => true);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.lngLat.lng},${e.lngLat.lat}.json?limit=1&types=region%2Cdistrict&access_token=${MAPBOX_ACCESS_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();
    setPlaceName(data.features[0].text);
  };

  const handleMarkerClick = (e) => {
    e.originalEvent.stopPropagation();
  };

  const closePopup = () => {
    setMarker({
      latitude: null,
      longitude: null,
    });
    setShowPopup(false);
  };

  return (
    <>
      <Map
        ref={myMap}
        id="myMap"
        padding={{ top: 50, left: 50, right: 50, bottom: 50 }}
        onViewportChange={setViewport}
        onClick={handleClick}
        initialViewState={{ ...viewport }}
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        customAttribution="Brought to you by the MyPlace team"
      >
        <NavigationControl />
        <GeolocateControl />
        <FullscreenControl />
        {/* <AddressAutofill accessToken={MAPBOX_ACCESS_TOKEN}> */}
        <SearchBox
          accessToken={MAPBOX_ACCESS_TOKEN}
          placeholder="Search Places"
          value={searchValue}
          marker={true}
          mapboxgl={mapRef}
          // map={mapRef.current}
        />
        {/* </AddressAutofill> */}
        {cityPins.length > 0 &&
          cityPins.map((cityPin) => {
            return (
              <Marker
                key={cityPin._id}
                latitude={cityPin.location.lat}
                longitude={cityPin.location.lng}
                color={cityPin.visited ? "#007d02" : "#f4f439"}
                onClick={handleMarkerClick}
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
            anchor="left"
            onClose={closePopup}
            closeButton={false}
            className="popup-container"
            offset={[15, -25]}
            maxWidth="1000px"
            closeOnClick={false}
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
