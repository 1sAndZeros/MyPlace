import { useState, useContext } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import arrowDown from '../../assets/chevron-down.svg';
import arrowUp from '../../assets/chevron-up.svg';
import edit from '../../assets/Edit.svg';
import signOut from '../../assets/sign-out.svg';


const Profile = () => {
    const [showSettings, setShowSettings] = useState(false);
    const currentUser = useContext(CurrentUserContext);

    const handleClick = () => {
        setShowSettings(!showSettings)  
    }

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