import { CurrentUserContext } from './context/CurrentUserContext';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import { authApi } from '../src/utils/api';
import { useEffect, useState } from 'react';
import LoginForm from './components/Login/LoginForm';
import SignUpForm from './components/Signup/SignupForm';
import Homepage from './components/Homepage/Homepage';
import WelcomePage from './components/WelcomePage/WelcomePage';
import AboutPage from './components/About/AboutPage';

function App() {
  const navigate = useNavigate();
  const [authError, setAuthError] = useState('');
  const [currentUser, setCurrentUser] = useState({
    username: '',
    profileImage: '',
    friends: [],
    favouriteLocations: [],
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authApi
        .getInfo()
        .then((data) => {
          let userInfo = data.user;
          console.log('userInfo from app.jsx:', userInfo);
          setCurrentUser(() => userInfo);
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  function onSignUp(data) {
    setSubmitting(true);
    authApi
      .signUp(data)
      .then(() => {
        navigate('/login');
      })
      .catch((err) => {
        let errMessage = err.message;
        setAuthError(errMessage);
        console.log(`Error: ${err.message}`);
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  function onLogIn(data) {
    setSubmitting(true);
    authApi
      .logIn(data)
      .then((res) => {
        localStorage.setItem('token', res.token);
      })
      .then(() => {
        authApi.getInfo().then((data) => {
          let userInfo = data.user;
          setCurrentUser(() => userInfo);
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
        });
        navigate('/home');
      })
      .catch((err) => {
        let errMessage = err.message;
        setAuthError(errMessage);
        console.log(`Error: ${errMessage}`);
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  const handleCloseError = () => {
    setAuthError('');
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Routes>
        <Route path='/' element={<WelcomePage navigate={useNavigate()} />} />
        <Route path='/home' element={<Homepage navigate={useNavigate()} />} />
        <Route path='/about' element={<AboutPage navigate={useNavigate()} />} />
        <Route
          path='/login'
          element={
            <LoginForm
              onLogIn={onLogIn}
              authError={authError}
              handleCloseError={handleCloseError}
              setAuthError={setAuthError}
              navigate={useNavigate()}
              submitting={submitting}
              setSubmitting={setSubmitting}
            />
          }
        />
        <Route
          path='/signup'
          element={
            <SignUpForm
              onSignUp={onSignUp}
              authError={authError}
              handleCloseError={handleCloseError}
              setAuthError={setAuthError}
              navigate={useNavigate()}
              submitting={submitting}
              setSubmitting={setSubmitting}
            />
          }
        />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
