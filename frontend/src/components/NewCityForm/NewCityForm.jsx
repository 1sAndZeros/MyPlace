import { useState, useEffect } from "react";
import "./NewCityForm.css";
import { authApi } from "../../utils/api";
import PropTypes from "prop-types";
import StarRating from "../StarRating/StarRating";
import addImg from "../../assets/icons/add-image.svg";
import errorImg from "../../assets/error.svg";
import errorClose from "../../assets/Close_square.svg";

function NewCityForm({ marker, setMarker, location, setCityPins }) {
  const [rating, setRating] = useState(0);
  const [memory, setMemory] = useState("");
  const [image, setImage] = useState("");
  const [visited, setVisited] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");
  const [visitedDate, setVisitedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    setErrorMessage("");
  }, [rating]);

  useEffect(() => {
    setMemory("");
    setErrorMessage("");
    if (!visited) {
      setRating(0);
      setVisitedDate(null);
      setImage("");
      setMemory("");
    }
  }, [visited]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((rating < 1 || rating > 5) && visited) {
      setErrorMessage("Rating must be between 1 and 5");
      return;
    }
    let newImage = await authApi
      .uploadPhoto(image)
      .then((data) => {
        return data.secure_url;
      })
      .catch((error) => {
        let errMessage = error.message;
        setError(errMessage);
        console.log(`Error: ${error.message}`);
      });

    const data = {
      rating: rating,
      visited: visited,
      visitedDate: visitedDate,
      memory: memory,
      name: location.name,
      photos: [newImage],
      location: {
        lat: location.lat,
        lng: location.lng,
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
      .catch((error) => {
        let errMessage = error.message;
        setError(errMessage);
        console.log(`Error: ${error.message}`);
      });
  };

  function closeAndResetForm() {
    setMarker(null);
    setVisited(true);
    setVisitedDate(new Date().toISOString().split("T")[0]);
    setRating(0);
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

  const handleImageChange = (event) => {
    setImage(() => event.target.files[0]);
  };

  const handleCloseError = () => {
    setError("");
  };

  return (
    <>
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
        {visited && (
          <label className="form__button--label" htmlFor="fileUpload">
            <img className="form__button--img" src={addImg} alt="choose file" />
            <input
              id="fileUpload"
              type="file"
              accept=".png, .jpg, .jpeg"
              name="image"
              onChange={handleImageChange}
            />
          </label>
        )}
        <div>
          <p className="error__error-message">{errorMessage}</p>
        </div>
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
      {error ? (
        <div className="error-auth">
          <div className="error-auth__box">
            <img className="error-auth__icon" src={errorImg} alt="error icon" />
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
    </>
  );
}

export default NewCityForm;
