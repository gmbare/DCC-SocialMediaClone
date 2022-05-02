import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

function AddAbouts(props) {
  const [about, setAbouts] = useState("");
  const { user } = useContext(AuthContext);

  async function getAboutMe() {
    let userAbout = await axios.get(
      `http://localhost:3008/api/abouts/${user._id}`
    );
    setAbouts(userAbout.data.about.text);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let strAboutMe = document.getElementById("commentField").value;
    await axios.post(`http://localhost:3008/api/abouts/${props.userId}`, {
      text: strAboutMe,
    });
    getAboutMe();
  }

  useEffect(() => {
    getAboutMe();
  }, []);

  return (
    <div>
      <form className="container" id="AboutMe" onSubmit={(event) => handleSubmit(event)}>
        <div className="text-start">
          <h4 className="text-dark">About me:</h4>
          <textarea
            className="form-control m-17 mb-3 border border-success"
            type="text"
            name="comment"
            id="commentField"
            defaultValue={about}
          ></textarea>
          <div>
            <input
              className="btn btn-success"
              type="submit"
              value="Submit"
              onClick={(event) => {
                handleSubmit(event);
                alert("About me saved!");
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddAbouts;
