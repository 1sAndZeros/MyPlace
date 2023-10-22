import { useNavigate } from "react-router-dom";
import TeamIcon from "../../assets/icons/team.svg?react";
import PinIcon from "../../assets/icons/pin2.svg?react";
import ChevronIcon from "../../assets/icons/chevron-down.svg?react";
import LogoutIcon from "../../assets/icons/sign-out.svg?react";
import { useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(true);
  const handleClick = (e) => {
    setHidden(!hidden);
  };

  function onLogOut(){
    localStorage.removeItem('token')
    navigate("/")
  }
  return (
    <>
      <ul>
        <li className={`sidebar__item ${hidden ? "" : "active"}`}>
          <div className="sidebar__item--heading" onClick={handleClick}>
            <PinIcon />
            <p>Favourite Places</p>
            <ChevronIcon />
          </div>
          <ul className="sidebar__item__menu">
            <li className="sidebar__item__menu--item">
              Location 1
            </li>
            <li className="sidebar__item__menu--item">
              Location 2
            </li>
          </ul>
        </li>
        <li className={`sidebar__item ${hidden ? "" : "active"}`}>
          <div className="sidebar__item--heading" onClick={handleClick}>
            <TeamIcon />
            <p>Friends</p>
            <ChevronIcon />
          </div>
          <ul className="sidebar__item__menu">
            <li className="sidebar__item__menu--item">
            Friend 1
            </li>
            <li className="sidebar__item__menu--item">
            Friend 2
            </li>
          </ul>
        </li>
        <div className="home__sidebar__logout">
          <button type="button" onClick={onLogOut}>
            <LogoutIcon />
            Logout
          </button>
        </div>
      </ul>
    </>
  );
};

export default Sidebar;
