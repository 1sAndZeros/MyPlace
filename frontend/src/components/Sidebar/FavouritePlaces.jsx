import { CurrentUserContext } from "../../context/CurrentUserContext";
import PinIcon from "../../assets/icons/pin2.svg?react";
import ChevronIcon from "../../assets/icons/chevron-down.svg?react";
import { useState, useContext } from "react";

const FavouritePlaces = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [hidden, setHidden] = useState(true);
  const handleClick = () => {
    setHidden(!hidden);
  };
  console.log("!!user", currentUser)
  return (
    <li className={`sidebar__item ${hidden ? "" : "active"}`}>
      <div className="sidebar__item--heading" onClick={handleClick}>
        <PinIcon />
        <p>Favourite Places</p>
        <ChevronIcon />
      </div>
      <ul className="sidebar__item__menu">
        {(currentUser.favouriteLocations.length >= 1) ? currentUser.favouriteLocations.map((location)=> {
          return (
            <li key={location._id} className="sidebar__item__menu--item">
              <p>{location.name}</p>
            </li>
          )
        }) : <p className="sidebar__item--empty">No favourite locations</p>}
      </ul>
    </li>
  );
};

export default FavouritePlaces;
