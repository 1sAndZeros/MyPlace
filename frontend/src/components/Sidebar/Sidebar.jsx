import TeamIcon from "../../assets/icons/team.svg?react";
import PinIcon from "../../assets/icons/pin2.svg?react";
import ChevronIcon from "../../assets/icons/chevron-down.svg?react";
import LogoutIcon from "../../assets/icons/sign-out.svg?react";
import { useState } from "react";

const Sidebar = () => {
  const [hidden, setHidden] = useState(true);
  const handleClick = (e) => {
    setHidden(!hidden);
  };
  return (
    <>
      <ul>
        <li className={`sidebar__item ${hidden ? "" : "active"}`}>
          <div className="sidebar__item--heading" onClick={handleClick}>
            <PinIcon />
            <h3>Favourite Places</h3>
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
        <li className={`sidebar__item ${hidden ? "" : "active"}`}>
          <div className="sidebar__item--heading" onClick={handleClick}>
            <TeamIcon />
            <h3>Friends</h3>
            <ChevronIcon />
          </div>
          <ul className="sidebar__item__menu">
            <li className="sidebar__item__menu--item">
              <h4>Friend 1</h4>
            </li>
            <li className="sidebar__item__menu--item">
              <h4>Friend 2</h4>
            </li>
          </ul>
        </li>
        <div className="home__sidebar__logout">
          <button>
            <LogoutIcon />
            Logout
          </button>
        </div>
      </ul>
    </>
  );
};

export default Sidebar;
