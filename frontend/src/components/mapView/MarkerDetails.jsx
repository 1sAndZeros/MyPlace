import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import StarRating from "../StarRating/StarRating";
import StarIcon from "../../assets/icons/star.svg?react";
import heartFilled from "../../assets/icons/heart-filled.svg";
import edit from "../../assets/icons/edit.svg";
import heart from "../../assets/icons/heart-nf.svg";
import trash from "../../assets/icons/trash.svg";
import { authApi } from "../../utils/api";

const MarkerDetails = ({ details, setDetails, setCityPins }) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
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
      console.log("details favourites", details.favourites);
      if (details.favourites.includes(currentUser._id)) {
        console.log("setIsFavourite(true)");
        setIsFavourite(true);
      } else {
        console.log("setIsFavourite(false)");
        setIsFavourite(false);
      }
      setIsVisited(details.visited);
    }
  }, [details, currentUser]);

  const closeDetails = () => {
    setDetails(null);
    setIsEdit(isEdit);
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
            console.log([data.city, ...newPins]);
            return [data.city, ...newPins];
          });
          closeDetails();
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const handleDelete = () => {
      authApi
        .deleteCityEntry(details._id)
        .then((res) => {
          console.log(res, "deleted city");
          closeDetails();
        })
        .catch((error) => {
          console.log(error, "error");
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
        .catch((err) => console.log(err));
    };

    const removeFavourite = () => {
      const filteredFavourites = favourites.filter((favourite) => {
        console.log("favourite", favourite);
        console.log("user", currentUser);

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
        .catch((err) => console.log(err));
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

    return (
      <section id="marker-details">
        <div className="marker-details__options">
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
          <img
            className="marker-details__icon"
            alt="favourite"
            src={isFavourite ? heartFilled : heart}
            onClick={toggleFavourite}
          />
          <p>{favourites.length >= 1 ? favourites.length : ""}</p>
        </div>
        <div className="marker-details__user">
          <img
            className="marker-details__user--name"
            alt="user image"
            src={
              user.profileImage
                ? user.profileImage
                : `https://eu.ui-avatars.com/api/?name=${user.username}&length=1`
            }
          />
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
