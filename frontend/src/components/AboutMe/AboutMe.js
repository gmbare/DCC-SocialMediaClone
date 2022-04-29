import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

function AddAbouts(props) {
  const [abouts, setAbouts] = useState("");
  async function handleSubmit(event) {
    event.preventDefault();
    let strAboutMe = document.getElementById("commentField").value;
    console.log(strAboutMe);
    console.log(props.userId);
    await axios.post(`http://localhost:3008/api/abouts/${props.userId}`, {
      text: strAboutMe,
    });
  }

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div id="addComment">
      <form id="commentform">
        <div className="text-start">
          <label>
            <h4 className="text-dark">About me:</h4>
          </label>
          <input
            className="form-control m-2 mb-3 border border-success"
            type="text"
            name="comment"
            id="commentField"
            defaultValue={"About me..."}
          ></input>
        </div>
        <div>
          <input
            className="btn btn-success"
            type="submit"
            value="Submit"
            onClick={(event) => {
              handleSubmit(event);
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default AddAbouts;
