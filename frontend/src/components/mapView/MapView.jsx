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
import errorImg from "../../assets/error.svg";
import errorClose from "../../assets/Close_square.svg";
import Key from "./Key";
import keys from "../../data/keys";
import PinIcon from "../../assets/icons/map-pin.svg?react";

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
  const [error, setError] = useState("");

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
        let errMessage = err.message;
        setError(errMessage);
        console.log(`Error: ${err.message}`);
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
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.lngLat.lng},${e.lngLat.lat}.json?limit=1&language=en&types=region%2Cdistrict&access_token=${MAPBOX_ACCESS_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();
    setPlaceName(data.features[0].text);
  };

  const handleMarkerClick = (e, id) => {
    e.originalEvent.stopPropagation();
    authApi
      .findCityById(id)
      .then((data) => {
        const cityPin = data.city;
        setDetails(cityPin);
        setMarker(null);
        setSearchMarker(null);
      })
      .catch((error) => {
        let errMessage = error.message;
        setError(errMessage);
        console.log(`Error: ${error.message}`);
      });
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

  const handleCloseError = () => {
    setError("");
  };

  return (
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
      <div className="map-owner">
        {!friend ? (
          <>
            <img
              className="profile__img"
              alt="user pic"
              src={
                currentUser.profileImage
                  ? currentUser.profileImage
                  : `https://eu.ui-avatars.com/api/?name=${currentUser.username}&length=1`
              }
            />
            <p>{`${currentUser.username}'s Map`}</p>
          </>
        ) : (
          <>
            <img
              className="profile__img"
              alt="user pic"
              src={
                friend.profileImage
                  ? friend.profileImage
                  : `https://eu.ui-avatars.com/api/?name=${friend.username}&length=1`
              }
            />
            <p>{`${friend.username}'s Map`}</p>
          </>
        )}
      </div>
      <div className="form__error-container">
        {error ? (
          <div className="error-auth">
            <div className="error-auth__box">
              <img
                className="error-auth__icon"
                src={errorImg}
                alt="error icon"
              />
              <p className="error-auth__message">{error}</p>
              <img
                className="error-auth__icon error-auth__icon--close"
                src={errorClose}
                alt="error close"
                onClick={handleCloseError}
              />
            </div>
          </div>
        ) : null}
      </div>
      <NavigationControl />
      <GeolocateControl />
      <FullscreenControl />
      <SearchBox
        options={{
          limit: "10",
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
          console.log("cityPin here", cityPin);
          return (
            <Marker
              test="test"
              key={cityPin._id + "pin"}
              latitude={cityPin.location.lat}
              longitude={cityPin.location.lng}
              onClick={(e) => handleMarkerClick(e, cityPin._id)}
              popup={markerDetailsPopupRef.current}
            >
              <div
                className={`${
                  cityPin.favourites.includes(currentUser._id)
                    ? "favourite"
                    : ""
                } ${cityPin.visited ? "visited" : "to-visit"} pin`}
              >
                <PinIcon />
              </div>
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
  );
};

export default MapView;
