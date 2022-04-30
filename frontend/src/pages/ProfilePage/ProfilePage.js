import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import FriendsList from "../../components/FriendsList/FriendsList";
import AddAbouts from "../../components/AboutMe/AboutMe";
import { Link } from "react-router-dom";
import { FaHome } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { RiImageEditFill } from 'react-icons/ri';
import "./ProfilePage.css"
import {useLocation} from "react-router-dom";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [mFriends, setMFriends] = useState();
  let location = useLocation()
  const {userImage} = location.state

  console.log(userImage)



  return (
    <div className="container">
      <h1 className="text-left">Home Page for {user.name}</h1>
      <div className="container d-flex">        
        <div className="w-75 m-2 border border-start">
          <div className="container">
            <div className="d-flex">
              <div className="lg-avatar">
                <button>
                <img src={`http://localhost:3008/backend/${userImage}`} alt={`image-${user._id}`} onClick={() => {if (document.getElementById('changeProfilePic').className == 'z-i100 visible') {
                  document.getElementById('changeProfilePic').className = 'z-i100 invisible';} else if (document.getElementById('changeProfilePic').className == 'z-i100 invisible'){document.getElementById('changeProfilePic').className = 'z-i100 visible'}
                  }}/> 
                </button>
                <div className="editIcon"><RiImageEditFill /></div>
                <div className="z-i100 invisible" id='changeProfilePic'>
                  <input type='file' /><button>Submit</button>
                </div>
              </div>
              <div className="mt-2 ms-3 editInfo">
                <div className="p-info-icon"><FaEdit /></div>
                <div className="d-flex">
                  <div className="label">Name: </div><div className="profileinfo">{/*NAME GOES HERE*/}</div>
                </div>
                <div className="d-flex">
                  <div className="label">Edit: </div><div className="profileinfo">{/*EMAIL GOES HERE*/}</div>
                </div>
              </div>
            </div>
            <AddAbouts userId={user._id}  />  
          <p className="editProfile-text">{user.name}</p>
          </div>
        </div> 
        <div> 
        <Link type="button" className="home-btn" to="/"><FaHome /></Link>    
          <FriendsList userId={user._id} setMFriends={setMFriends} />
        </div> 
      </div>
    </div>
  );
};

export default ProfilePage;
