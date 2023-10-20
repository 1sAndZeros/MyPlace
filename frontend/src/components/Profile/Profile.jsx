import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import arrowDown from "../../assets/chevron-down.svg";
import arrowUp from "../../assets/chevron-up.svg";
import edit from "../../assets/Edit.svg";
import signOut from "../../assets/sign-out.svg";

const Profile = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [image, setImage] = useState("");
  const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
  const [newImage, setNewImage] = useState('');

  // const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setShowSettings(!showSettings);
  };

  useEffect(() => {
      uploadFile();
  }, [])


  const handleImageChange = (event) => {
    setImage(() => event.target.files[0]);
  };

  const uploadFile = () => {
    const formData = new FormData();
    formData.set("sample_file", image);
    fetch("http://localhost:8080/avatar", {
      method: "post",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject("can`t add image");
        }
        res.json().then((data) => {
          let newImage = (data.secure_url)
          updateFile(newImage);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateFile = (newImage) => {
    fetch(`http://localhost:8080/users/me`, {
      method: "PATCH", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ profileImage: newImage }),
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject("can`t update image");
        }
        res.json().then((data) => {
          console.log(data)
          setCurrentUser(data.newUser)
        });
      })
      .catch((err) => {
        console.log(err);
      });
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
          <img className="profile__img" alt="user pic"
            src={currentUser.profileImage} />
        </div>
        <div
          className={`profile__settings ${
            !showSettings ? "hidden" : "visible"
          }`}
        >
          <div className="profile__settings-element">
            <img className="profile__settings__icon" src={edit} />
            <input
              id="fileUpload"
              type="file"
              accept=".png, .jpg, .jpeg"
              name="image"
              onChange={handleImageChange}
            />
            <button type="button" onClick={uploadFile}>
              Submit
            </button>
            <p>Edit profile picture</p>
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
