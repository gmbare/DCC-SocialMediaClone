import React, { useState, useContext } from "react";
// import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import MainFeed from "../../components/HomePage/MainFeed/MainFeed";
import FriendsList from "../../components/FriendsList/FriendsList";
import "./HomePage.css"
import { Link } from "react-router-dom";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [mFriends, setMFriends] = useState();

  return (
    <div className="container">
      <h1 className="text-left">Home Page for {user.name}</h1>
      <div className="container d-flex">
        <MainFeed userId={user._id} mFriends={mFriends} />
        <div className="m-5 border border-start pos-sticky">
          <Link type="button" to="/profile" className="editProfile "> 
          <img src="../images/burger.jpg" alt={`image-${user._id}`} />   
          <p className="editProfile-text">{user.name}</p></Link>       
          <FriendsList userId={user._id} setMFriends={setMFriends} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
