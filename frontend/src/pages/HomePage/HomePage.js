import React from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import MainFeed from "../../components/HomePage/MainFeed/MainFeed"

const HomePage = () => {
  const { user } = useContext(AuthContext);
  return (
  <div className="container">
    <h1 className="text-left">Home Page for {user.name}</h1>
    <div className="container d-flex">
      <MainFeed userId = {user._id} />
      <div className="w-25 m-2 border border-start">
       
      </div>
    </div>
  </div>)
};

export default HomePage;
