import { useState } from "react";
import { Link } from "react-router-dom";
import SlideShow from "../SlideShow/SlideShow";
import EyeOpen from "../../assets/icons/eye-open.svg?react";
import EyeClosed from "../../assets/icons/eye-closed.svg?react";
import errorImg from "../../assets/error.svg";
import errorClose from "../../assets/Close_square.svg";

const SignupForm = ({
  onSignUp,
  authError,
  setAuthError,
  handleCloseError,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [errors, setErrors] = useState([]);

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
    const repeatPasswordErrors = validateRepeatPassword(
      password,
      newRepeatPassword
    );
    setErrors({ ...errors, repeatPassword: repeatPasswordErrors });
    setRepeatPassword(newRepeatPassword);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const validateUsername = (username) => {
    const errors = [];
    if (username.length < 2) {
      errors.push("Username should has at least 2 characters");
    }
    return errors;
  };

  const validateEmail = (email) => {
    const errors = [];
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      errors.push("Please enter a valid email address. Ex: example@email.com");
    }
    if (email.trim() === "") {
      errors.length = 0;
    }
    return errors;
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push("Minimum 8 characters; ");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("1 uppercase letter; ");
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.push("1 special character; ");
    }
    if (!/\d/.test(password)) {
      errors.push("1 number; ");
    }
    return errors;
  };

  const validateRepeatPassword = (password, repeatPassword) => {
    const errors = [];
    if (password !== repeatPassword) {
      errors.push("Passwords do not match; ");
    }
    return errors;
  };

  const hasErrors = (email, password, errors) => {
    const isEmpty = email.trim() === "" || password.trim() === "";
    const hasValidationErrors = Object.values(errors).some(
      (error) => Array.isArray(error) && error.length > 0
    );
    return isEmpty || hasValidationErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSignUp({
      username,
      email,
      password,
    });

    setUsername("");
    setEmail("");
    setPassword("");
    setRepeatPassword("");
    setAuthError("");
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="container">
        <div className="container-panel container-panel_left">
          <SlideShow />
        </div>
        <div className="container-panel container-panel_right">
          <form className="form" onSubmit={handleSubmit}>
            <h2 className="form__title">Sign up</h2>
            <div className="form__input-box">
              <label htmlFor="username" className="form__label">
                Username
              </label>
              <input
                type="text"
                className="form__input"
                id="username"
                value={username}
                onChange={handleUsernameChange}
              />
              <div className="form__error-container">
                {errors.username ? (
                  <p className="error__error-message">{errors.username}</p>
                ) : null}
              </div>
            </div>
            <div className="form__input-box">
              <label htmlFor="email" className="form__label">
                Email
              </label>
              <input
                type="email"
                className="form__input"
                id="email"
                value={email}
                onChange={handleEmailChange}
              />
              <div className="form__error-container">
                {errors.email ? (
                  <p className="error__error-message">{errors.email}</p>
                ) : null}
              </div>
            </div>
            <div className="form__input-box">
              <div className="form__password__label">
                <label className="form__label">Password</label>
                <div
                  className="form__password__wrapper"
                  onClick={handleShowPassword}
                  type="button"
                >
                  {showPassword ? <EyeOpen /> : <EyeClosed />}
                  <p>{showPassword ? "hide" : "show"}</p>
                </div>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="form__input"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <div className="form__error-container">
                {errors.password ? (
                  <p className="error__error-message">{errors.password}</p>
                ) : null}
              </div>
            </div>
            <div className="form__input-box">
              <div className="form__password__label">
                <label className="form__label">Password</label>
                <div
                  className="form__password__wrapper"
                  onClick={handleShowRepeatPassword}
                  type="button"
                >
                  {showRepeatPassword ? <EyeOpen /> : <EyeClosed />}
                  <p>{showRepeatPassword ? "hide" : "show"}</p>
                </div>
              </div>
              <input
                type={showRepeatPassword ? "text" : "password"}
                className="form__input"
                id="password"
                value={repeatPassword}
                onChange={handleRepeatPasswordChange}
              />
              <div className="form__error-container">
                {errors.repeatPassword ? (
                  <p className="error__error-message">
                    {errors.repeatPassword}
                  </p>
                ) : null}
              </div>
            </div>
            <button
              disabled={hasErrors(email, password, errors)}
              className={`form__button form__ghost ${
                hasErrors(email, password, errors) ? "disabled__auth" : ""
              }`}
              id="submit"
              type="submit"
            >
              Sign Up
            </button>
            <p>
              Already have an account?{" "}
              <Link to="/login" className="form__link">
                Log In
              </Link>
            </p>
          </form>
          {authError ? (
            <div className="error-auth">
              <div className="error-auth__box">
                <img
                  className="error-auth__icon"
                  src={errorImg}
                  alt="error icon"
                />
                <p className="error-auth__message">{authError}</p>
              </div>
              <img
                className="error-auth__icon error-auth__icon--close"
                src={errorClose}
                alt="error close"
                onClick={handleCloseError}
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default SignupForm;
