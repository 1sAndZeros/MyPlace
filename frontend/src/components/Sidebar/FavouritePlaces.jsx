import PinIcon from "../../assets/icons/pin2.svg?react";
import ChevronIcon from "../../assets/icons/chevron-down.svg?react";
import { useState } from "react";

const FavouritePlaces = () => {
  const [hidden, setHidden] = useState(true);
  const handleClick = () => {
    setHidden(!hidden);
  };
  return (
    <li className={`sidebar__item ${hidden ? "" : "active"}`}>
      <div className="sidebar__item--heading" onClick={handleClick}>
        <PinIcon />
        <p>Favourite Places</p>
        <ChevronIcon />
      </div>
      <ul className="sidebar__item__menu">
        <li className="sidebar__item__menu--item">
          <h4>Location 1</h4>
        </li>
        <li className="sidebar__item__menu--item">
          <h4>Location 2</h4>
        </li>
      </ul>
    </li>
  );
};

export default FavouritePlaces;
