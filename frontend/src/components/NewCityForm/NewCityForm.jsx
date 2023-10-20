import { useState } from "react";
import "./NewCityForm.css";
import { authApi } from "../../utils/api";
import PropTypes from "prop-types";
import StarRating from "../StarRating/StarRating";

function NewCityForm({
  marker,
  setMarker,
  placeName,
  setPlaceName,
  setShowPopup,
  setCityPins,
}) {
  NewCityForm.propTypes = {
    marker: PropTypes.object.isRequired,
    setMarker: PropTypes.func.isRequired,
    placeName: PropTypes.string,
    setPlaceName: PropTypes.func.isRequired,
    setShowPopup: PropTypes.func.isRequired,
    setCityPins: PropTypes.func.isRequired,
  };
  const [rating, setRating] = useState(0);
  const [visited, setVisited] = useState(true);
  const [visitedDate, setVisitedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      console.log("Rating must be between 1 and 5");
      return;
    }
    const data = {
      rating: rating,
      visited: visited,
      visitedDate: visitedDate,
      name: placeName,
      location: {
        lat: marker.latitude,
        lng: marker.longitude,
      },
    };
    authApi
      .createCityEntry(data)
      .then((apiData) => {
        console.log(apiData.city);
        setCityPins((prev) => {
          return [...prev, apiData.city];
        });
        setPlaceName(null);
        setMarker({
          latitude: null,
          longitude: null,
        });
        setVisited(true);
        setVisitedDate(new Date().toISOString().split("T")[0]);
        setRating(5);
        setShowPopup(false);
      })
      .catch((err) => {
        console.log(`Error: ${err.message}`);
      });
  };

  function handleRatingChange(e) {
    setRating(e.target.value);
  }

  function handleVisitedChange(e) {
    console.log(e);
    setVisited(e.target.checked);
  }

  function handleDateChange(e) {
    console.log(e);
    setVisitedDate(e.target.value);
  }

  return (
    <form id="new-city-form" onSubmit={handleSubmit}>
      <h2 className="form__title">Add MyPlace</h2>
      <div className="checkbox-container">
        <input
          id="_checkbox"
          className=""
          name="visited"
          type="checkbox"
          value={visited}
          onChange={handleVisitedChange}
        />
        <label className="checkbox__label" htmlFor="_checkbox">
          <div id="tick_mark"></div>
        </label>
      </div>
      {visited && (
        <div className="form__input-box">
          <label className="form__label">Visited Date</label>
          <input
            className="form__input"
            name="visitedDate"
            type="date"
            value={visitedDate}
            onChange={handleDateChange}
          />
        </div>
      )}
      <StarRating setRating={setRating} />
      <button className="form__button" type="submit">
        Add MyPlace
      </button>
    </form>
  );
}

export default NewCityForm;
