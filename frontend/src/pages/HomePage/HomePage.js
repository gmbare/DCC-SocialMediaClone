import React, { useState, useContext} from 'react';
// import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import MainFeed from "../../components/HomePage/MainFeed/MainFeed"
import FriendsList from "../../components/FriendsList/FriendsList";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [mFriends, setMFriends] = useState()
  // const [mFriends, setMFriends] = useState({user:'',post:['']})

    return (
  <div className="container">
    <h1 className="text-left">Home Page for {user.name}</h1>
    <div className="container d-flex">
      <MainFeed userId = {user._id} mFriends={mFriends} />
      <div className="w-25 m-2 border border-start">
       <FriendsList userId={user._id} setMFriends={setMFriends}/>
      </div>
    </div>
  </div>)
};

export default HomePage;
