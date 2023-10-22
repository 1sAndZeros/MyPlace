import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/icons/pin.svg?react";
import Profile from "../Profile/Profile";

function Navbar() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav id="navbar" className={`navbar ${path === "/home" ? "navbar--home" : ""}`}>
      {path === "/home" ?
        <Link
          to="/signup"
          className={path === "/home" ? "navbar__brand--black" : "navbar__brand--white"}
        >F.A.Q</Link>
        :
        <Link
          to="/signup"
          className={path === "/home" ? "navbar__brand--black" : "navbar__brand--white"}
        >About</Link>
      }
      <Link
        to="/home"
        className={`navbar__brand ${path === "/home" ? "navbar__brand--black" : "navbar__brand--white"}`}
      >
        <Logo className="navbar__brand__heading" />
        <p className="navbar__brand__heading">MyPlace.</p>
      </Link>
      {path === "/home" ? (
        <Profile />
      ) : (
        <ul className="navbar-nav">
          <li>
            <Link to="/login" className="navbar__brand--white">Log In</Link>
          </li>
          <li>
            <Link to="/signup" className="navbar__brand--white">Sign Up</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
