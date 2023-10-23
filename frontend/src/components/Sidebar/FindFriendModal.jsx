import {useState, useEffect, useContext} from 'react';
import {authApi} from '../../utils/api';
import { CurrentUserContext } from '../../context/CurrentUserContext';
const FindFriendModal = () => {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [allUsers, setAllUsers] = useState([]);
 

    useEffect(() => {
        authApi.getUsers()
        .then(data =>{
            setAllUsers(data.users) 
        } )
        .catch(err => console.log(err))
    },[])

    const addFriend = (friendId) => {
           authApi.addFriend(friendId)
            .then(data => {
           let userInfo = data.user;
            setCurrentUser(() => userInfo)
            localStorage.setItem("userInfo", JSON.stringify(userInfo));  
        })
        .catch(err => console.log(err))

    }
    const removeFriend = (friendId) => {
           authApi.removeFriend(friendId)
            .then(data => {
           let userInfo = data.user;
            setCurrentUser(() => userInfo)
            localStorage.setItem("userInfo", JSON.stringify(userInfo));  
        })
        .catch(err => console.log(err))

    }
    return(

        <div className='friend-modal'>
            <h3>
                Search For Friends
            </h3>
            <ul className="users">
                {allUsers.map(user => {
                    return(
                        <li className="user" key={user._id}>
                            <img className="user-img" src={user.profileImage ? user.profileImage : `https://eu.ui-avatars.com/api/?name=${user.username}&length=1`} alt={user.username} />
                            <p className="user-name">{user.username}</p>
                            {
                            (currentUser.friends.find((friend) => friend._id === user._id) ? 
                            <button className="add-friend" onClick={() => removeFriend(user._id)}>Remove Friend</button>:
                            <button className="add-friend" onClick={() => addFriend(user._id)}>Add Friend</button> 
                                )
                            }

                        </li>
                    )
                
                }
                )}
            </ul>
        </div>
    )
}

export default FindFriendModal;