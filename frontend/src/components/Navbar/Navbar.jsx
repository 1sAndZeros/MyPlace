import { useState } from "react";
import { Link } from "react-router-dom";
import { worldPinIcon as Logo } from "../../assets/pin.svg";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav id="navbar" className="navbar navbar-expand-sm navbar-light bg-light">
      <h4 className="navbar__about">About</h4>
      <Link to="/" className="navbar-brand">
        <Logo />
        <h3 className="navbar-brand__heading">MyPlace.</h3>
      </Link>
      {isOpen && (
        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
      )}
      <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
        <ul className="navbar-nav">
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
