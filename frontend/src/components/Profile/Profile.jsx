import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { authApi } from "../../utils/api";
import arrowDown from "../../assets/chevron-down.svg";
import arrowUp from "../../assets/chevron-up.svg";
import edit from "../../assets/Edit.svg";
import signOut from "../../assets/sign-out.svg";
import addImg from "../../assets/icons/add-image.svg";

const Profile = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [image, setImage] = useState("");
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

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
      })
      .catch((err) => {
        console.log(err);
        console.log(`Error in uploadPhoto: ${err.message}`);
      });
    setShowSettings(!showSettings);
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
            alt="user pic"
            src={currentUser.profileImage}
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

          <div className="profile__settings-element">
            <img className="profile__settings__icon" src={signOut} />
            <p>Sign Out</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
