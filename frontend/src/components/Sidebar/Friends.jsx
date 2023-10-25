import TeamIcon from "../../assets/icons/team.svg?react";
import ChevronIcon from "../../assets/icons/chevron-down.svg?react";
import SearchIcon from "../../assets/icons/search.svg?react";
import { useState, useContext } from "react";
import FindFriendModal from "./FindFriendModal";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { authApi } from "../../utils/api";

const Friends = ({ setCityPins, setFriend }) => {
  const [hidden, setHidden] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useContext(CurrentUserContext);

  const showFriendPins = (friendId, friendUsername) => {
    authApi
      .getCityPinsById(friendId)
      .then((data) => {
        setCityPins(data.cities);
        setFriend(friendUsername);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = () => {
    setHidden(!hidden);
  };

  return (
    <li className={`sidebar__item ${hidden ? "" : "active"}`}>
      <FindFriendModal showModal={showModal} setShowModal={setShowModal} />
      <div className="sidebar__item--heading" onClick={handleClick}>
        <TeamIcon />
        <p>Friends</p>
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
