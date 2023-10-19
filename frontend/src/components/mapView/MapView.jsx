import React from "react";
import Map from "react-map-gl";
import { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import GeocoderControl from "./GeocoderControl";

// get request for cities / regions https://api.mapbox.com/geocoding/v5/mapbox.places/{searchString}.json?fuzzyMatch=false&limit=10&types=region%2Cdistrict&autocomplete=true&access_token=pk.eyJ1IjoiaW15cGxhY2UiLCJhIjoiY2xudTViMGp3MGNwYTJsbzVtdnNxZ3NvOCJ9.j49LvpTufygf0Cx9HhldIg

const MapView = () => {
  const MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoiaW15cGxhY2UiLCJhIjoiY2xudTViMGp3MGNwYTJsbzVtdnNxZ3NvOCJ9.j49LvpTufygf0Cx9HhldIg";

  const [viewport, setViewport] = React.useState({
    width: "100%",
    height: "100%",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });
  const [marker, setMarker] = React.useState({
    latitude: null,
    longitude: null,
  });

  const handleClick = (e) => {
    console.log(e.lngLat.lng);
    console.log(e.lngLat.lat);
    setMarker({
      latitude: e.lngLat.lat,
      longitude: e.lngLat.lng,
    });
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
        <input type="text" />
        {marker.latitude && (
          <Marker
            latitude={marker.latitude}
            longitude={marker.longitude}
            onClick={handleMarkerClick}
          />
        )}
      </Map>
    </>
  );
};

export default MapView;
