import { useState, useEffect } from "react";
import StarRating from "../StarRating/StarRating";
import StarIcon from "../../assets/icons/star.svg?react";
import heartFilled from "../../assets/icons/heartfilled.svg";
import edit from "../../assets/icons/edit.svg";
import heart from "../../assets/icons/heartnf.svg";
import { authApi } from "../../utils/api";

const MarkerDetails = ({ details, setDetails, setCityPins }) => {
  const [newMemory, setNewMemory] = useState("");
  const [isFavourite, setIsFavourite] = useState(false);
  const [newRating, setRating] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [isVisited, setIsVisited] = useState(false);
  const [visitedDate, setVisitedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    if (details) {
      setIsFavourite(details.favourite);
      setIsVisited(details.visited)
    }
  }, [details]);

  const closeDetails = () => {
    setDetails(null);
    setIsEdit(!isEdit);
    setNewMemory("")
  };

  if (details) {
    let {
      visited,
      memory,
      photos,
      rating,
      recommendations,
      user,
      location,
      favourite,
    } = details;
    const vistedDate = new Date(details.visitedDate).toLocaleDateString(
      "en-gb"
    );

    const handleSave = () => {
      const update = {
        favourite: isFavourite,
        visited: isVisited,
        memory: newMemory,
        visitedDate: visitedDate,
        rating: newRating,
      };
      authApi
        .updateCity(update, details._id)
        .then((data) => {
          // setDetails(data.city);
          setCityPins((prevValues) => {
            let newPins = prevValues.filter((pin) => pin._id !== details._id)
            console.log([data.city, ...newPins])
            return [data.city, ...newPins]
          })
          closeDetails()
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const toggleFavourite = () => {
      setIsFavourite(!isFavourite);
    };

    const toggleEdit = () => {
      setIsEdit(!isEdit);
    };

    const handleDateChange = (e) => {
      setVisitedDate(e.target.value);
    };

    const toggleVisitedChange = () => {
      setIsVisited(!isVisited);
    };

    const handleMemoryChange = (e) => {
      setNewMemory(e.target.value);
    }

    return (
      <section id="marker-details">
        <div className="marker-details__options">
          <img
            className="marker-details__icon"
            src={edit}
            onClick={toggleEdit}
          />
          <img
            className="marker-details__icon"
            alt="favourite"
            value={favourite}
            src={isFavourite ? heartFilled : heart}
            onClick={toggleFavourite}
          />
        </div>
        <div className="marker-details__user">
          <img src={user.profileImage}/>
          <p>{details.user.username}</p>
        </div>
        <div className="marker-details__place">
          <p className="marker-details__name">{details.name}</p>
          {!isEdit && (
            <h2 className="marker-details__rating">
              {[...Array(rating).keys()].map((_) => {
                return <StarIcon />;
              })}
            </h2>
          )}
        </div>
        {isEdit ? (
          <>
            <div className="checkbox__container--edit">
              <label className="checkbox__label">
                <input
                  type="checkbox"
                  value={visited}
                  checked={isVisited}
                  onClick={toggleVisitedChange}
                />
                <div className="checkmark"></div>
              </label>
              <p>Visited</p>
            </div>
            <StarRating setRating={setRating} value={rating} />
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
            <textarea
              className="form__memory__textarea"
              name="Text1"
              cols="40"
              rows="5"
              placeholder="Tell us more..."
              id="message"
              type="text"
              value={newMemory}
              onChange={handleMemoryChange}
            />
          </>
        ) : (
          <div className="marker-details__container">
            <p>Visited: {vistedDate}</p>
            <p className="marker-details__memory">{memory}</p>
            <img
              className="marker-details__photo"
              src="https://images.unsplash.com/photo-1683009686716-ac2096a5a73b?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
        )}
        <div className="form__button--container">
          <button
            onClick={closeDetails}
            className="form__button form__button--cancel"
            type="button"
          >
            close
          </button>
          <button
            onClick={handleSave}
            className="form__button form__button--add"
            type="submit"
          >
            Save
          </button>
        </div>
      </section>
    );
  }
};

export default MarkerDetails;

// memory string
// photos [url]
// rating num
// recommendations [Recs]
// user {}
// visitedDate date string
// visited bool
// location {lat, lng}
