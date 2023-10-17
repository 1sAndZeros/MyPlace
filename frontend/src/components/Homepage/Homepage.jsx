import React from 'react';
import { Link } from 'react-router-dom';
import './homepage.css'
import Navbar from '../Navbar/Navbar';

function App() {
  return (
    <>
    <Navbar/>
    <div className="container">
      <div className="row">
        <div className="left-side">
          <Link to="/signup" className="text-center btn btn-dark shadow">Sign Up</Link>
          <div className="spacer"></div>
          <Link to="/login" className="text-center btn btn-light shadow">Log In</Link>
        </div>
        <div className="right-side">
          <img src="https://miro.medium.com/max/1400/0*ciZqN_rpLW5fF4mW.gif" alt="logo" className="img-fluid" />
          
          <p className="text-center text-sprimary "><br></br>Welcome to MyPlace,<br />Share your Memories</p>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
