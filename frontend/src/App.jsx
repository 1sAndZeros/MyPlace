import LoginForm from "./components/Login/LoginForm";
import SignUpForm from "./components/Signup/SignupForm";
import Homepage from "./components/Homepage/Homepage";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import {authApi} from '../src/utils/api';
import MapComponent from "./components/MapComponent/MapComponent";
function App() {

  function onSignUp(data){
    authApi.signUp(data)
    .then(() => {
      console.log("success")
    })
    .catch((err) => {
      console.log(`Error: ${err}`)
    })
  }

  return (
    <Routes>
      <Route path="/" element={<Homepage navigate={useNavigate()} />} />
      <Route path="/login" element={<LoginForm navigate={useNavigate()} />} />
      <Route path="/signup" element={<SignUpForm onSignUp={onSignUp} navigate={useNavigate()} />} />
      <Route path="/map" element={<MapComponent />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
