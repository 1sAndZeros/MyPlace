import LoginForm from "./components/Login/LoginForm";
import SignUpForm from "./components/Signup/SignupForm";
import Homepage from "./components/Homepage/Homepage";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import { CurrentUserContext } from "./context/CurrentUserContext";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { authApi } from "../src/utils/api";
import MapComponent from "./components/MapComponent/MapComponent";
import { useState, useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const [authError, setAuthError] = useState("");
  const [currentUser, setCurrentUser] = useState({
    name: "",
    image: "",
  });

  function onSignUp(data) {
    authApi
      .signUp(data)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        let errMessage = err.message;
        setAuthError(errMessage);
        console.log(`Error: ${err.message}`);
      });
  }

  function onLogIn(data) {
    authApi
      .logIn(data)
      .then((res) => {
        localStorage.setItem("token", res.token);
      })
      .then(() => {
        navigate("/home");
        authApi.getInfo();
      })
      .catch((err) => {
        let errMessage = err.message;
        setAuthError(errMessage);
        console.log(`Error: ${errMessage}`);
      });
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      authApi
        .getInfo()
        .then(async (data) => {
          let userInfo = data.user;
          setCurrentUser(userInfo);
        })
        .catch((err) => {
          console.log(`Error ${err}`);
        });
    }
  }, []);

  const handleCloseError = () => {
    setAuthError("");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/" element={<WelcomePage navigate={useNavigate()} />} />
        <Route path="/home" element={<Homepage navigate={useNavigate()} />} />
        <Route
          path="/login"
          element={
            <LoginForm
              onLogIn={onLogIn}
              authError={authError}
              handleCloseError={handleCloseError}
              setAuthError={setAuthError}
              navigate={useNavigate()}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <SignUpForm
              onSignUp={onSignUp}
              authError={authError}
              handleCloseError={handleCloseError}
              setAuthError={setAuthError}
              navigate={useNavigate()}
            />
          }
        />
        <Route path="/map" element={<MapComponent />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
