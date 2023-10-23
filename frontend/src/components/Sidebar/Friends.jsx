import TeamIcon from "../../assets/icons/team.svg?react";
import ChevronIcon from "../../assets/icons/chevron-down.svg?react";
import SearchIcon from "../../assets/icons/search.svg?react";
import { useState } from "react";

const Friends = () => {
  const [hidden, setHidden] = useState(true);
  const handleClick = () => {
    setHidden(!hidden);
  };
  return (
    <li className={`sidebar__item ${hidden ? "" : "active"}`}>
      <div className="sidebar__item--heading" onClick={handleClick}>
        <TeamIcon />
        <p>Friends</p>
        <ChevronIcon />
      </div>
      <ul className="sidebar__item__menu">
        <button className="btn-ghost">
          <SearchIcon />
          Find Friends
        </button>
        <li className="sidebar__item__menu--item">
          <h4>Friend 1</h4>
        </li>
        <li className="sidebar__item__menu--item">
          <h4>Friend 2</h4>
        </li>
      </ul>
    </li>
  );
};

export default Friends;
