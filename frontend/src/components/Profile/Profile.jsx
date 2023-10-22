import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { authApi } from "../../utils/api";
import edit from "../../assets/Edit.svg";
import signOut from "../../assets/sign-out.svg";

const Profile = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [image, setImage] = useState("");
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setCurrentUser(JSON.parse(userInfo));
    }
  }, []);

  function onLogOut() {
    localStorage.removeItem("token");
    navigate("/");
  }

  const handleClick = () => {
    setShowSettings(!showSettings);
  };

  const handleImageChange = (event) => {
    setImage(() => event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    authApi
      .uploadPhoto(image)
      .then((data) => {
        return authApi.updateProfile(data.secure_url);
      })
      .then((data) => {
        setCurrentUser(data.newUser);
        localStorage.setItem("userInfo", JSON.stringify(data.newUser));
      })
      .catch((err) => {
        console.log(err);
        console.log(`Error in uploadPhoto: ${err.message}`);
      });
    setShowSettings(!showSettings);
    const fileInput = document.getElementById("fileUpload");
    if (fileInput) {
      fileInput.value = ""; // Reset the input field
    }
  };

  return (
    <>
      <section className="profile">
        <div className="profile__info">
          <img
            className="profile__icon"
            src={!showSettings ? arrowDown : arrowUp}
            onClick={handleClick}
          />
          <p className="profile__username">{currentUser.username}</p>
          <img
            className="profile__img"
            alt="avatar"
            src={
              currentUser.profileImage
                ? currentUser.profileImage
                : `https://eu.ui-avatarss.com/api/?length=1&name=${currentUser.username}`
            }
          />
        </div>
        <div
          className={`profile__settings ${
            !showSettings ? "hidden" : "visible"
          }`}
        >
          <p>Edit profile picture</p>
          <div className="profile__settings-element">
            <label className="form__button--label" htmlFor="fileUpload">
              <img className="profile__settings__icon" src={edit} />
              <input
                id="fileUpload"
                type="file"
                accept=".png, .jpg, .jpeg"
                name="image"
                onChange={handleImageChange}
              />
              <button
                type="button"
                className="form__button--cancel"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </label>
          </div>
          <div className="profile__settings-element" onClick={onLogOut}>
            <img className="profile__settings__icon" src={signOut} />
            <p>Sign Out</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
