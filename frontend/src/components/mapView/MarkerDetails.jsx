import { useState, useEffect } from "react";
import StarRating from "../StarRating/StarRating";
import StarIcon from "../../assets/icons/star.svg?react";
import heartFilled from "../../assets/icons/heartfilled.svg";
import heart from "../../assets/icons/heartnf.svg";
import { authApi } from "../../utils/api";

const MarkerDetails = ({ details, setDetails }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const [visited, setVisited] = useState(false);

  useEffect(() => {
    if (details) {
      setIsFavourite(details.favourite);
    }
  }, [details]);

  const closeDetails = () => {
    setDetails(null);
  };
  
  if (details) {
    let { visited, memory, photos, rating, recommendations, user, location, favourite } =
      details;
    const vistedDate = new Date(details.visitedDate).toLocaleDateString(
      "en-gb"
    );

    const handleSave = () => {
      const update = { favourite: isFavourite };
      authApi
        .updateCity(update, details._id)
        .then((data) => {
          setDetails(data.city);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const toggleFavourite = () => {
      setIsFavourite(!isFavourite);

    }

    return (
      <section id="marker-details">
        <div className="marker-details__options">
          <img className="marker-details__heart" alt="favourite" value={favourite} src={isFavourite ? heartFilled : heart} onClick={toggleFavourite} />
          {/* <TrashIcon /> */}
        </div>
        <div className="marker-details__user">
          <img
            src={`${
              user.profileImage
                ? user.profileImage
                : "https://api.dicebear.com/7.x/avataaars/svg"
            }`}
            alt="avatar"
          />
          <p className="bold">{details.user.username}</p>
        </div>
        <div className="marker-details__place">
          <h2 className="marker-details__name">{details.name}</h2>
          <h2 className="marker-details__rating">
            {[...Array(rating).keys()].map((_) => {
              return <StarIcon />;
            })}
          </h2>
        </div>
        <div className="marker-details--scroll">
        <label className="checkbox__label">
          <input
            type="checkbox"
            checked={visited}
            onClick={() => setVisited(true)}
          />
          <div className="checkmark"></div>
        </label>
        <p>Visited</p>
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
          {visited && <h3>Visited: {vistedDate}</h3>}
          <p >{memory}</p>
        </div>
        <img
          className="marker-details__photo"
          src="https://images.unsplash.com/photo-1683009686716-ac2096a5a73b?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
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
