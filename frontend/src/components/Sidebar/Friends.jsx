import TeamIcon from "../../assets/icons/team.svg?react";
import ChevronIcon from "../../assets/icons/chevron-down.svg?react";
import SearchIcon from "../../assets/icons/search.svg?react";
import { useState, useContext } from "react";
import errorImg from "../../assets/error.svg";
import errorClose from "../../assets/Close_square.svg";
import FindFriendModal from "./FindFriendModal";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { authApi } from "../../utils/api";

const Friends = ({ setCityPins, setFriend }) => {
  const [hidden, setHidden] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const { currentUser } = useContext(CurrentUserContext);

  const showFriendPins = (friendId, friendUsername) => {
    authApi
      .getCityPinsById(friendId)
      .then((data) => {
        setCityPins(data.cities);
        setFriend(friendUsername);
      })
      .catch((error) => {
        let errMessage = error.message;
        setError(errMessage);
        console.log(`Error: ${error.message}`);
      });
  };

  const handleClick = () => {
    setHidden(!hidden);
  };

  const handleCloseError = () => {
    setError("");
  };

  return (
    <li className={`sidebar__item ${hidden ? "" : "active"}`}>
      <FindFriendModal showModal={showModal} setShowModal={setShowModal} />
      <div className="sidebar__item--heading" onClick={handleClick}>
        <TeamIcon />
        <p>Friends</p>
        {error ? (
          <div className="error-auth-pos">
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
        <ChevronIcon />
      </div>
      <ul className="sidebar__item__menu">
        {currentUser.friends.map((user) => {
          return (
            <li
              onClick={() => showFriendPins(user._id, user.username)}
              className="user"
              key={user._id}
            >
              <img
                className="user-img"
                src={
                  user.profileImage
                    ? user.profileImage
                    : `https://eu.ui-avatars.com/api/?name=${user.username}&length=1`
                }
                alt={user.username}
              />
              <p className="user-name">{user.username}</p>
            </li>
          );
        })}
        <button className="btn-ghost" onClick={() => setShowModal(true)}>
          <SearchIcon />
          Find Friends
        </button>
      </ul>
    </li>
  );
};

export default Friends;
