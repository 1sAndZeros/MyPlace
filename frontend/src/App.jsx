import LoginForm from "./components/Login/LoginForm";
import SignUpForm from "./components/Signup/SignupForm";
import Homepage from "./components/Homepage/Homepage";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import { CurrentUserContext } from './context/CurrentUserContext';
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { authApi } from "../src/utils/api";
import MapComponent from "./components/MapComponent/MapComponent";
import { useState, useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({
    name: "",
    image: ""
  })

  function onSignUp(data) {
    authApi.signUp(data)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(`Error: ${err.message}`);
      });
  }

  function onLogIn(data) {
    authApi.logIn(data)
      .then((res) => {
        localStorage.setItem("token", res.token);
      })
      .then(() => {
        navigate("/");
        authApi.getInfo()
      })
      .catch((err) => {
        console.log(`Error: ${err.message}`);
      });
  }


  useEffect(() => {
    if(localStorage.getItem('token')) {
        authApi.getInfo()
        .then(async data => {
            let userInfo = data.user
            setCurrentUser(userInfo)
        })
        .catch((err) => {
            console.log(`Error ${err}`)
        })
        }
    }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/" element={<Homepage  navigate={useNavigate()} />} />
        <Route
          path="/welcome"
          element={<WelcomePage navigate={useNavigate()} />}
        />
        <Route
          path="/login"
          element={<LoginForm onLogIn={onLogIn} navigate={useNavigate()} />}
        />
        <Route
          path="/signup"
          element={<SignUpForm onSignUp={onSignUp} navigate={useNavigate()} />}
        />
        <Route path="/map" element={<MapComponent />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
