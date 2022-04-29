import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import FriendsList from "../../components/FriendsList/FriendsList";
import axios from "axios";
import AddAbouts from "../../components/AboutMe/AboutMe";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [mFriends, setMFriends] = useState();



  return (
    <div className="container">
      <h1 className="text-left">Home Page for {user.name}</h1>
      <div className="container d-flex">
        <FriendsList userId={user._id} setMFriends={setMFriends} />
        <div className="w-25 m-2 border border-start">
          <div className="container">
            <AddAbouts userId={user._id}  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
