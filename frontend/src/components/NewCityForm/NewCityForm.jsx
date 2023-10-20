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
  const [memory, setMemory] = useState("");
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
      memory: memory,
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
        closeAndResetForm();
      })
      .catch((err) => {
        console.log(`Error: ${err.message}`);
      });
  };

  function closeAndResetForm() {
    setPlaceName(null);
    setMarker({
      latitude: null,
      longitude: null,
    });
    setVisited(true);
    setVisitedDate(new Date().toISOString().split("T")[0]);
    setRating(5);
    setShowPopup(false);
  }

  function handleRatingChange(e) {
    setRating(e.target.value);
  }

  function handleVisitedChange(e) {
    setVisited(e.target.checked);
  }

  function handleDateChange(e) {
    setVisitedDate(e.target.value);
  }

  function handleMemoryChange(e) {
    setMemory(e.target.value);
  }

  return (
    <form id="new-city-form" onSubmit={handleSubmit}>
      <h3 className="form__title form__title-popup">New Place</h3>
      <div className="checkbox__container">
        <label className="checkbox__label">
          <input
            type="checkbox"
            checked={visited}
            onClick={() => setVisited(true)}
          />
          <div className="checkmark"></div>
        </label>
        <p>Visited</p>
        <label className="checkbox__label">
          <input
            type="checkbox"
            checked={!visited}
            onClick={() => setVisited(false)}
          />
          <div className="checkmark"></div>
        </label>
        <p>Want to visit</p>
      </div>
      {visited && (
        <>
          <StarRating setRating={setRating} />
          <div className="form__input-box">
            <label className="form__label">Visited Date</label>
            <input
              className="form__input form__date"
              name="visitedDate"
              type="date"
              value={visitedDate}
              onChange={handleDateChange}
            />
          </div>
        </>
      )}
      <textarea
        className="form__memory__textarea"
        name="Text1"
        cols="40"
        rows="5"
        placeholder="Tell us more..."
        id="message"
        type="text"
        value={memory}
        onChange={handleMemoryChange}
      />
      <div className="form__button--container">
        <button
          onClick={closeAndResetForm}
          className="form__button form__button--cancel"
          type="button"
        >
          cancel
        </button>
        <button className="form__button form__button--add" type="submit">
          add MyPlace
        </button>
      </div>
    </form>
  );
}

export default NewCityForm;
