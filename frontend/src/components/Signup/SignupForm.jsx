import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const SignupForm = ({onSignUp}) => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = React.useState(false);
  const [errors, setErrors] = React.useState([]);

  const handleUsernameChange = (event) => {
    const newUsername = event.target.value;
    const usernameErrors = validateUsername(newUsername);
    setErrors({ ...errors, username: usernameErrors });
    setUsername(newUsername);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    const emailErrors = validateEmail(newEmail);
    setErrors({ ...errors, email: emailErrors });
    setEmail(newEmail);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    const passwordErrors = validatePassword(newPassword);
    setErrors({ ...errors, password: passwordErrors });
    setPassword(newPassword);
  };

  const handleRepeatPasswordChange = (event) => {
    const newRepeatPassword = event.target.value;
    const repeatPasswordErrors = validateRepeatPassword(password, newRepeatPassword);
    setErrors({ ...errors, repeatPassword: repeatPasswordErrors });
    setRepeatPassword(newRepeatPassword);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    onSignUp({
      username,
      email,
      password
    })

    setUsername('');
    setEmail('');
    setPassword('');
    setRepeatPassword('');
    setErrorMessage('');
  };

    const validateUsername = (username) => {
      const errors = [];
      if (username.length < 2) {
        errors.push('Username should has at least 2 characters')
      }
      return errors
    }

    const validateEmail = (email) => {
      const errors = [];
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(email)) {
        errors.push('Please enter a valid email address. Ex: example@email.com');
      }
      if (email.trim() === '') {
        errors.length = 0;
      }
      return errors;
    };
    
    const validatePassword = (password) => {
      const errors = [];
      if (password.length < 8) {
        errors.push('Minimum 8 characters; ');
      }
      if (!/[A-Z]/.test(password)) {
        errors.push('1 uppercase letter; ');
      }
      if (!/[!@#$%^&*]/.test(password)) {
        errors.push('1 special character; ');
      }
      if (!/\d/.test(password)) {
        errors.push('1 number; ');
      }
      return errors;
    };

    const validateRepeatPassword = (password, repeatPassword) => {
      const errors = [];
      if (password !== repeatPassword) {
        errors.push('Passwords do not match; ');
      }
      return errors;
    }

    const hasErrors = (email, password, errors) => {
      // Check if either email or password is empty
      const isEmpty = email.trim() === '' || password.trim() === '';
    
      // Check if there are any errors in the errors object
      const hasValidationErrors = Object.values(errors).some(
        (error) => Array.isArray(error) && error.length > 0
      );
    
      // Combine the checks using logical OR (||)
      return isEmpty || hasValidationErrors;
    };

  return (
    <>
    <Navbar />
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleSubmit}>
        <h1 className="success">Sign-up</h1>
        {/* {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" value={username} onChange={handleUsernameChange} required />
          {errors.username ? (
                      <p className="error_message">
                        {errors.username}
                      </p>) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" value={email} onChange={handleEmailChange} required />
          {errors.email ? (
                    <p className="error_message">
                      {errors.email}
                    </p>) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <div className="input-group">
            <input type={showPassword ? "text" : "password"} className="form-control" id="password" value={password} onChange={handlePasswordChange} required />
            {errors.password ? (
                    <p className="error_message">
                      {errors.password}
                    </p>) : null}
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
          {errors.repeatPassword ? (
                    <p className="error_message">
                      {errors.repeatPassword}
                    </p>) : null}
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
