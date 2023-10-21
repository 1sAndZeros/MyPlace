import { Marker, Popup } from "react-map-gl";
import NewCityForm from "../NewCityForm/NewCityForm";

const ClickMarker = ({
  clickMarker,
  setClickMarker,
  setCityPins,
  placeName,
}) => {
  const handleClose = () => {
    setClickMarker(null);
  };

  if (clickMarker) {
    const lng = clickMarker.longitude;
    const lat = clickMarker.latitude;
    return (
      <>
        <Marker longitude={lng} latitude={lat} color="#ff0000" />
        <Popup
          longitude={lng}
          latitude={lat}
          anchor="left"
          onClose={handleClose}
          closeButton={false}
          className="popup-container"
          offset={[15, -25]}
          maxWidth="1000px"
          closeOnClick={false}
        >
          <NewCityForm
            marker={clickMarker}
            setMarker={setClickMarker}
            location={{
              lat: lat,
              lng: lng,
              name: placeName,
            }}
            setCityPins={setCityPins}
          />
        </Popup>
      </>
    );
  }
};

export default ClickMarker;
