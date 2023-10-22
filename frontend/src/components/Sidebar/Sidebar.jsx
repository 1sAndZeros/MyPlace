import { useNavigate } from "react-router-dom";
import LogoutIcon from "../../assets/icons/sign-out.svg?react";
import FavouritePlaces from "./FavouritePlaces";
import Friends from "./Friends";

const Sidebar = () => {
  const navigate = useNavigate();

  const onLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

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
