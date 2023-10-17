import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

function LoginForm() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    

    setUsername('');
    setPassword('');
    setErrorMessage('');
  };

  return (
    <>
    <Navbar/>
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleSubmit}>
        <h1 className="success">Login</h1>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" value={username} onChange={handleUsernameChange} required />
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
        <button type="submit" className="btn btn-success me-2">Login</button>
        <Link to="/" className="btn btn-dark">Home</Link>
      </form>
    </div>

    </>
  );
}

export default LoginForm;
