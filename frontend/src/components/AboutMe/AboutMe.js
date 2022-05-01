import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { FaEdit } from 'react-icons/fa';

function AddAbouts(props) {
  const [about, setAbouts] = useState("");
  const { user } = useContext(AuthContext);
  
  async function getAboutMe() {
    let userAbout = await axios.get(`http://localhost:3008/api/abouts/${user._id}`);
    setAbouts(userAbout.data.about.text);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let strAboutMe = document.getElementById("commentField").value
    // console.log(strAboutMe);
    // console.log(props.userId);
    await axios.post(`http://localhost:3008/api/abouts/${props.userId}`, {
      text: strAboutMe,
    });
    getAboutMe();
    document.getElementById('AboutMeInfo').className = 'aboutmeInfo d-inline';
    document.getElementById('AboutMe').className = 'd-none'
  }

 useEffect(() => {
    getAboutMe();
  }, []);

  return (
    <div id="addComment" className="text-start">
      <h3 className="text-dark">About me:</h3> <div className="p-info-icon" ><FaEdit onClick={() => {document.getElementById('AboutMe').className = 'd-inline';document.getElementById('AboutMeInfo').className = 'd-none';}}/></div>
      <div id="AboutMeInfo" className="aboutmeInfo">
      {about}
      </div>
      <div className="m-3">
      <form id="AboutMe" className="d-none" onSubmit={(event) => handleSubmit(event)}>
        <div>                  
          <textarea className="form-control" type="text" name="comment" id="commentField" defaultValue={about}></textarea>   
        </div>     
        <div className="m-3">
          <input className="btn btn-success" type="submit" value="Submit" onClick={(event) => {
              handleSubmit(event);
              alert("About me saved!");
            }}
          />
        </div>        
      </form>
      </div>
    </div>
  );
}

export default AddAbouts;

    
    

 