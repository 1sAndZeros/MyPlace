import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { authApi } from "../../utils/api";
import edit from "../../assets/Edit.svg";

const Profile = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [image, setImage] = useState("");
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      console.log("userInfo profile.jsx:", userInfo)
      setCurrentUser(() => JSON.parse(userInfo));
    }
  }, []);

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
        setCurrentUser(() => data.newUser);
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
          <p className="profile__username">{currentUser.username}</p>
          <div className="profile__container">
            <img
              className="profile__img"
              alt="user pic"
              src={currentUser.profileImage}
            />
            <button
              className="profile__button-edit"
              type="button"
              onClick={handleClick}
            ></button>
          </div>
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
          {/* <div className="profile__settings-element" onClick={onLogOut}>
                        <img className="profile__settings__icon" src={signOut} />
                        <p>Sign Out</p>
                    </div> */}
        </div>
      </section>
    </>
  );
};

export default Profile;
