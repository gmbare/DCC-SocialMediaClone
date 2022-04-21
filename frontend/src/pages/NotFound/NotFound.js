import React from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const NotFound = () => {
  const { user } = useContext(AuthContext);
  return <h1 className="container">Not Found!</h1>;
};

export default NotFound;
