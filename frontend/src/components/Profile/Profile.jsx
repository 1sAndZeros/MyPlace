import { useState, useContext } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import arrowDown from '../../assets/chevron-down.svg';
import arrowUp from '../../assets/chevron-up.svg';
import edit from '../../assets/Edit.svg';
import signOut from '../../assets/sign-out.svg';


const Profile = () => {
    const [showSettings, setShowSettings] = useState(false);
    const [image, setImage] = useState("")
    const currentUser = useContext(CurrentUserContext);

    // const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setShowSettings(!showSettings)  
    }

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
      } 
     

      const uploadFile = () => {
        const formData = new FormData (); 
        formData.set("sample_file", image);
        fetch( "http://localhost:8080/avatar", {
          method: 'post',
          body: formData
        })
        .then(res => {
          if (!res.ok) {
            return Promise.reject('can`t add post')
          }
          res.json().then((data) => {
              console.log(data)
          })
        })
        // .then((data) => {
        //   let newPost = data.post;
        //   setPosts([newPost, ...posts])
        //   window.localStorage.setItem("token", data.token)
        .catch(err => {
            console.log(err)
        })
        }
      

    // const uploadFile = async (e) => {
    //     //   setLoading(true);
    //       e.preventDefault();
    //       const formData = new FormData (); 
    //       formData.set("sample_file", image);
    //       console.log(formData)
    //       try {
    //         const response = await fetch("http://localhost:8080/avatar", {
    //             method: "POST",
    //             body: formData
    //         });
    //         console.log(response)
    //         let res = response.data.secure_url;
    //         console.log(res)
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     };

    return (
        <>
            <section className="profile">
                <div className="profile__info">
                    <img className="profile__icon" src={!showSettings? arrowDown : arrowUp} onClick={handleClick} />
                    <p className="profile__username">{currentUser.username}</p>
                    <img className="profile__img" />
                </div>
                <div className={`profile__settings ${!showSettings ?  'hidden' : 'visible'}`}>
                    <div className="profile__settings-element">
                        <img className="profile__settings__icon" src={edit} />
                        <input id="fileUpload" type="file" accept=".png, .jpg, .jpeg" name="image" onChange={handleImageChange} />
                        <button type="submit" onClick={uploadFile}>Submit</button>
                        <p>Edit profile picture</p>
                    </div>
                    <div className="profile__settings-element">
                        <img className="profile__settings__icon" src={signOut}/>
                        <p>Sign Out</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Profile;