import { useEffect, useRef, useState, useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { useNavigate } from "react-router-dom";
import Map, {
  Marker,
  Popup,
  useMap,
  FullscreenControl,
  NavigationControl,
  GeolocateControl,
} from "react-map-gl";
import { SearchBox } from "@mapbox/search-js-react";
import "mapbox-gl/dist/mapbox-gl.css";
import { authApi } from "../../utils/api";
import "./Map.css";
import { MapboxSearchBox } from "@mapbox/search-js-web";
import SearchMarker from "./SearchMarker";
import ClickMarker from "./ClickMarker";
import MarkerDetails from "./MarkerDetails";
import Key from "./Key";
import keys from "../../data/keys";

// get request for cities / regions https://api.mapbox.com/geocoding/v5/mapbox.places/{searchString}.json?fuzzyMatch=false&limit=10&types=region%2Cdistrict&autocomplete=true&access_token=pk.eyJ1IjoiaW15cGxhY2UiLCJhIjoiY2xudTViMGp3MGNwYTJsbzVtdnNxZ3NvOCJ9.j49LvpTufygf0Cx9HhldIg

const MapView = ({ cityPins, setCityPins, friend }) => {
  const MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoiaW15cGxhY2UiLCJhIjoiY2xudTViMGp3MGNwYTJsbzVtdnNxZ3NvOCJ9.j49LvpTufygf0Cx9HhldIg";

  const navigate = useNavigate();
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 51.523375519247345, // Makers office lat
    longitude: -0.0835492028568628, // Makers office lng
    zoom: 4,
  });
  const [marker, setMarker] = useState(null);
  const [placeName, setPlaceName] = useState(null);

  const [searchValue, setSearchValue] = useState("");
  const [searchMarker, setSearchMarker] = useState(null);
  const [details, setDetails] = useState(null);

  const myMap = useMap();
  const mapRef = useRef();
  const searchRef = useRef();
  // const search = new MapboxSearchBox();
  const markerDetailsPopupRef = useRef();

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    authApi
      .getMyCityPins()
      .then((data) => {
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
    setSearchMarker(null);
    setMarker(() => {
      return {
        latitude: e.lngLat.lat,
        longitude: e.lngLat.lng,
      };
    });
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.lngLat.lng},${e.lngLat.lat}.json?limit=1&types=region%2Cdistrict&access_token=${MAPBOX_ACCESS_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();
    setPlaceName(data.features[0].text);
  };

  const handleMarkerClick = (e) => {
    e.originalEvent.stopPropagation();
    const location = e.target._lngLat;
    const cityPin = cityPins.find((pin) => {
      return (
        pin.location.lat === location.lat && pin.location.lng === location.lng
      );
    });
    console.log(cityPin);
    setDetails(cityPin);
    setMarker(null);
    setSearchMarker(null);
  };

  const handleSelection = (res) => {
    console.log(res.features[0]);
    setSearchMarker(res.features[0]);
  };

  useEffect(() => {
    if (!searchMarker) {
      return;
    }
    setMarker(null);
    let coordinates = searchMarker.geometry.coordinates;
    console.log(coordinates);
    myMap.current.flyTo({
      center: coordinates,
      duration: 5000, // Animate over 5 seconds
      essential: true, // This animation is considered essential with
      //respect to prefers-reduced-motion
      curve: 2,
      zoom: 7,
    });
    console.log(searchMarker);
  }, [searchMarker]);

  return (
    <>
      <div>{`${!friend ? currentUser.username : friend}'s map`}</div>
      <Map
        ref={myMap}
        id="myMap"
        padding={{ top: 50, left: 50, right: 50, bottom: 50 }}
        onViewportChange={setViewport}
        onClick={handleClick}
        initialViewState={{ ...viewport }}
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        //         mapStyle="mapbox://styles/mapbox/streets-v9"
        mapStyle="mapbox://styles/mapbox/streets-v12"
        // mapStyle="mapbox://styles/mapbox/dark-v11"
        customAttribution="Brought to you by the MyPlace team"
      >
        <NavigationControl />
        <GeolocateControl />
        <FullscreenControl />
        <SearchBox
          options={{
            limit: "10",
            // types: "country",
          }}
          accessToken={MAPBOX_ACCESS_TOKEN}
          placeholder="Search Places"
          value={searchValue}
          onRetrieve={handleSelection}
          onChange={(value) => searchValue(value)}
          mapboxgl={mapRef}
          ref={searchRef}
        />
        <SearchMarker
          searchMarker={searchMarker}
          setSearchMarker={setSearchMarker}
          setCityPins={setCityPins}
        />
        <ClickMarker
          clickMarker={marker}
          setClickMarker={setMarker}
          setCityPins={setCityPins}
          placeName={placeName}
        />
        {cityPins.length > 0 &&
          cityPins.map((cityPin) => {
            console.log("cityPin here");
            return (
              <Marker
                test="test"
                key={cityPin._id}
                latitude={cityPin.location.lat}
                longitude={cityPin.location.lng}
                color={
                  cityPin.visited
                    ? keys.find((key) => key.text === "Visited").color
                    : keys.find((key) => key.text === "Want to visit").color
                }
                onClick={handleMarkerClick}
                popup={markerDetailsPopupRef.current}
              >
                {/* {cityPin.visited
                  ? keys.find((key) => key.text === "Visited").icon
                  : keys.find((key) => key.text === "Want to visit").icon} */}
              </Marker>
            );
          })}
        <MarkerDetails
          details={details}
          setCityPins={setCityPins}
          setDetails={setDetails}
        />
        <Key />
      </Map>
    </>
  );
};

export default MapView;
