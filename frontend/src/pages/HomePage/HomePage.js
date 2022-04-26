import React from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  return <h1 className="container">Home Page for {JSON.stringify(user)}!</h1>;
};

export default HomePage;
