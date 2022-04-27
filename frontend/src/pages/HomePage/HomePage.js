import React from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import MainFeed from "../../components/HomePage/MainFeed/MainFeed"
import FriendsList from "../../components/FriendsList/FriendsList";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  return (
  <div className="container">
    <h1 className="text-left">Home Page for {user.name}</h1>
    <div className="container d-flex">
      <MainFeed userId = {user._id} />
      <div className="w-25 m-2 border border-start">
<<<<<<< HEAD
       {/* <Friends /> */}
       {/* <PendingFriends /> */}
=======
       <FriendsList userId = {user._id} />
>>>>>>> f1f38af3a6e1550930e26da1bf487971018a1444
      </div>
    </div>
  </div>)
};

export default HomePage;
