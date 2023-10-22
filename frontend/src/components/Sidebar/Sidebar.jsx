import { useNavigate } from "react-router-dom";
import TeamIcon from "../../assets/icons/team.svg?react";
import PinIcon from "../../assets/icons/pin2.svg?react";
import ChevronIcon from "../../assets/icons/chevron-down.svg?react";
import LogoutIcon from "../../assets/icons/sign-out.svg?react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FavouritePlaces from "./FavouritePlaces";
import Friends from "./Friends";
import Key from "../mapView/Key";

const Sidebar = () => {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(true);

  const onLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleClick = (e) => {
    setHidden(!hidden);
  };

  function onLogOut() {
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <>
      <ul>
        <FavouritePlaces />
        <Friends />
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
