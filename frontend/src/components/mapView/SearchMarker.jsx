import { Marker, Popup } from "react-map-gl";
import NewCityForm from "../NewCityForm/NewCityForm";
import PinIcon from "../../assets/icons/map-pin.svg?react";

const SearchMarker = ({ searchMarker, setSearchMarker, setCityPins }) => {
  const handleClose = () => {
    setSearchMarker(null);
  };

  if (searchMarker) {
    const lng = searchMarker.geometry.coordinates[0];
    const lat = searchMarker.geometry.coordinates[1];
    return (
      <>
        <Marker longitude={lng} latitude={lat} color="#9319cc">
          <PinIcon />
        </Marker>
        <Popup
          longitude={lng}
          latitude={lat}
          anchor="left"
          onClose={handleClose}
          closeButton={false}
          className="popup-container"
          offset={[15, 15]}
          maxWidth="1000px"
          closeOnClick={false}
        >
          <NewCityForm
            marker={searchMarker}
            setMarker={setSearchMarker}
            location={{
              lat: lat,
              lng: lng,
              name: searchMarker.properties.name,
            }}
            setCityPins={setCityPins}
          />
        </Popup>
      </>
    );
  }
};

export default SearchMarker;
