import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import StarRating from "../StarRating/StarRating";
import StarIcon from "../../assets/icons/star.svg?react";
import heartFilled from "../../assets/icons/heart-filled.svg";
import edit from "../../assets/icons/edit.svg";
import heart from "../../assets/icons/heart-nf.svg";
import trash from "../../assets/icons/trash.svg";
import errorImg from "../../assets/error.svg";
import errorClose from "../../assets/Close_square.svg";
import { authApi } from "../../utils/api";

const MarkerDetails = ({ details, setDetails, setCityPins }) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [newMemory, setNewMemory] = useState("");
  const [isFavourite, setIsFavourite] = useState(false);
  const [newRating, setRating] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [isVisited, setIsVisited] = useState(false);
  const [error, setError] = useState("");
  const [visitedDate, setVisitedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    if (details) {
      if (details.favourites.includes(currentUser._id)) {
        setIsFavourite(true);
      } else {
        setIsFavourite(false);
      }
      setIsVisited(details.visited);
    }
  }, [details, currentUser]);

  const closeDetails = () => {
    setDetails(null);
    setIsEdit(false);
    setNewMemory("");
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
      favourites,
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
          setCityPins((prevValues) => {
            let newPins = prevValues.filter((pin) => pin._id !== details._id);
            console.log("new pins", newPins);
            console.log("data new city", data.city);
            return [data.city, ...newPins];
          });
          closeDetails();
        })
        .catch((error) => {
          let errMessage = error.message;
          setError(errMessage);
          console.log(`Error: ${error.message}`);
        });
    };

    const handleDelete = () => {
      authApi
        .deleteCityEntry(details._id)
        .then(() => {
          setCityPins((prevValues) => {
            let newPins = prevValues.filter((pin) => pin._id !== details._id);
            return newPins;
          });
          closeDetails();
        })
        .catch((error) => {
          let errMessage = error.message;
          setError(errMessage);
          console.log(`Error: ${error.message}`);
        });
    };

    const addFavourite = () => {
      let update = {
        favourites: [...favourites, currentUser._id],
      };
      let updateUser = {
        favouriteLocations: [...currentUser.favouriteLocations, details._id],
      };
      const promises = [
        authApi.updateCity(update, details._id),
        authApi.updateUser(updateUser),
      ];
      Promise.all(promises)
        .then(([cityData, userData]) => {
          setDetails(() => {
            return cityData.city;
          });
          setCurrentUser((prevUser) => {
            return {
              ...prevUser,
              favouriteLocations: userData.newUser.favouriteLocations,
            };
          });
        })
        .catch((error) => {
          let errMessage = error.message;
          setError(errMessage);
          console.log(`Error: ${error.message}`);
        });
    };

    const removeFavourite = () => {
      const filteredFavourites = favourites.filter((favourite) => {
        return favourite !== currentUser._id;
      });
      let update = {
        favourites: filteredFavourites,
      };
      const filteredUsers = currentUser.favouriteLocations.filter(
        (location) => {
          return location._id !== details._id;
        }
      );
      let updateUser = {
        favouriteLocations: filteredUsers,
      };
      const promises = [
        authApi.updateCity(update, details._id),
        authApi.updateUser(updateUser),
      ];
      Promise.all(promises)
        .then(([cityData, userData]) => {
          setDetails(() => {
            return cityData.city;
          });
          setCurrentUser((prevUser) => {
            return {
              ...prevUser,
              favouriteLocations: userData.newUser.favouriteLocations,
            };
          });
        })
        .catch((error) => {
          let errMessage = error.message;
          setError(errMessage);
          console.log(`Error: ${error.message}`);
        });
    };

    const toggleFavourite = () => {
      if (!isFavourite) {
        addFavourite();
      } else {
        removeFavourite();
      }
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
    };
    const handleCloseError = () => {
      setError("");
    };

    return (
      <section id="marker-details">
        <div className="marker-details__options">
          {currentUser._id === details.user._id ? (
            <>
              <img
                className="marker-details__icon"
                src={edit}
                onClick={toggleEdit}
                alt="edit"
              />
              <img
                className="marker-details__icon"
                onClick={handleDelete}
                alt="delete"
                src={trash}
              />
            </>
          ) : null}
          <img
            className="marker-details__icon"
            alt="favourite"
            src={isFavourite ? heartFilled : heart}
            onClick={toggleFavourite}
          />
          <p>{favourites.length >= 1 ? favourites.length : ""}</p>
        </div>
        <div className="marker-details__user">
          <div className="marker-details__user--container">
            <img
              className="marker-details__user--img"
              alt="user image"
              src={
                user.profileImage
                  ? user.profileImage
                  : `https://eu.ui-avatars.com/api/?name=${user.username}&length=1`
              }
            />
          </div>
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
              className="form__memory__textarea form__memory--edit"
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
            {visited && <p>Visited: {vistedDate}</p>}
            <p className="marker-details__memory">{memory}</p>
            <img className="marker-details__photo" src={photos} />
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
          {isEdit ? (
            <button
              onClick={handleSave}
              className="form__button form__button--add"
              type="submit"
            >
              Save
            </button>
          ) : null}
        </div>
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
