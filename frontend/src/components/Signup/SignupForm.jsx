import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

function SignupForm() {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = React.useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRepeatPasswordChange = (event) => {
    setRepeatPassword(event.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid email address');
      return;
    }

    const uppercaseRegex = /^(?=.*[A-Z])/;
    const specialCharRegex = /^(?=.*[!@#$%^&*])/;

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      return;
    }

    if (!uppercaseRegex.test(password)) {
      setErrorMessage('Password must contain at least one uppercase character');
      return;
    }

    if (!specialCharRegex.test(password)) {
      setErrorMessage('Password must contain at least one special character');
      return;
    }

    if (password !== repeatPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setUsername('');
    setEmail('');
    setPassword('');
    setRepeatPassword('');
    setErrorMessage('');
  };

  return (
    <>
    <Navbar />
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleSubmit}>
        <h1 className="success">Sign-up</h1>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" value={username} onChange={handleUsernameChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <div className="input-group">
            <input type={showPassword ? "text" : "password"} className="form-control" id="password" value={password} onChange={handlePasswordChange} required />
            <button type="button" className="btn btn-outline-secondary" onClick={handleShowPassword}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                <path d="M8 4s4 0 4 4-4 4-4 4-4-2-4-4 4-4 4-4zm0 6c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0-5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="repeatPassword" className="form-label">Repeat Password</label>
          <div className="input-group">
          <input type={showRepeatPassword ? "text" : "password"} className="form-control" id="repeatPassword" value={repeatPassword} onChange={handleRepeatPasswordChange} required />
          <button type="button" className="btn btn-outline-secondary" onClick={handleShowRepeatPassword}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                <path d="M8 4s4 0 4 4-4 4-4 4-4-2-4-4 4-4 4-4zm0 6c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0-5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
              </svg>
            </button>
            </div>
        </div>
        <button type="submit" className="btn btn-success me-2">Sign Up</button>
        <Link to="/login" className="btn btn-dark">Sign Up</Link>
      </form>
    </div>
    </>
  );
}

export default SignupForm;
