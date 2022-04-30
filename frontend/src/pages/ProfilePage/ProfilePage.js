import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import FriendsList from "../../components/FriendsList/FriendsList";
import AddAbouts from "../../components/AboutMe/AboutMe";
import {useLocation} from "react-router-dom";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [mFriends, setMFriends] = useState();
  let location = useLocation()
  const {userImage} = location.state

  console.log(userImage)



  return (
    <div className="container">
      <h1 className="text-left">Home Page for {user.name}</h1>
      <div className="container d-flex">
        <FriendsList userId={user._id} setMFriends={setMFriends} />
        <div className="w-25 m-2 border border-start">
          <div className="container">
            <AddAbouts userId={user._id}  />
          <img src={`http://localhost:3008/backend/${userImage}`} alt={`image-${user._id}`} />   
          <p className="editProfile-text">{user.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
