import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      
        <Link to="/" className="navbar-brand">
        <img src="https://www.reshot.com/preview-assets/icons/TZCXQGV5F4/maps-TZCXQGV5F4.svg" alt="logo" className="img-fluid" />
        <h4 className="text-center text-bold">MyPlace</h4>
          
        </Link>
        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link text-primary"><i><strong>Home</strong></i></Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Log In</Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </li>
          </ul>
        </div>
      
    </nav>
  );
}

export default Navbar;
