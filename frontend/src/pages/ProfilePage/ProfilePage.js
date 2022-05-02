import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import FriendsList from "../../components/FriendsList/FriendsList";
import AddAbouts from "../../components/AboutMe/AboutMe";
import { Link } from "react-router-dom";
import { FaHome } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { RiImageEditFill } from 'react-icons/ri';
import { RiCloseCircleLine } from 'react-icons/ri';
import "./ProfilePage.css"
import { useLocation } from "react-router-dom";
import axios from "axios";
import FormData from 'form-data'
// import burgerbackground from './assets/burgerbackground.mp4'

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [mFriends, setMFriends] = useState();
  let location = useLocation()
  const [userImage, setUserImage] = useState(`uploads\\images\\burger.jpg`);
  // const [userImage, setUserImage] = useState(`uploads\\images\\burger.jpg`);
  // const { userImage } = location.state

  const getUserImage = async () => {
    console.log(user._id)
    let img = await axios.get(`http://localhost:3008/api/abouts/profilepic/${user._id}`)
    // console.log(`/backend/${img.data}`)
    if (img.data.length > 0){
      setUserImage(img.data)
    }
  }


  function handleSubmit(e){
    e.preventDefault()
    // var testBody = {'myImage':document.getElementById("imageUpload").value}
    var bodyFormData = new FormData();
    bodyFormData.append('image', document.getElementById("imageUpload").files[0])
    console.log(bodyFormData.get('image'))
    pushUserImage(bodyFormData)
  }
  const pushUserImage = async (bodyFormData) => {
    await axios({
    method: "post",
    url: `http://localhost:3008/api/abouts/profilepic/${user._id}`,
    data: bodyFormData,
    headers: { "encType": "multipart/form-data" },
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (response) {
      console.log(response);
    });

    // await axios.post(`http://localhost:3008/api/abouts/profilepic/${user._id}`, {data:bodyFormData, headers: { "encType": "multipart/form-data" }, method:"post"})
    getUserImage()


  }

  useEffect(() => {
    getUserImage()
  },[])


  return (
    <div className="container shadow mt-2 border border-light">
      {/* <video src={burgerbackground} /> */}
      <h1 className="text-left mb-5 border-bottom border-warning">Profile Page for {user.name}</h1>
      <div className="container d-flex">
        <div className="w-75">
          <div>
            <div className="d-flex mb-5">
              <div className="lg-avatar">                
                  <img className="pro-avatar" src={`http://localhost:3008/backend/${userImage}`} alt={`image-${user._id}`}  align="left" />                
                <div className="editIcon"><RiImageEditFill onClick={() => {
                    if (document.getElementById('changeProfilePic').className == 'z-i100 visible') {
                      document.getElementById('changeProfilePic').className = 'z-i100 invisible';
                    } else if (document.getElementById('changeProfilePic').className == 'z-i100 invisible') { document.getElementById('changeProfilePic').className = 'z-i100 visible' }
                  }} />
                </div>
                <div className="z-i100 invisible" id='changeProfilePic'>
                  <div className="changePhoto">
                  <form onSubmit={(e) => {handleSubmit(e)
                  document.getElementById('changeProfilePic').className = 'z-i100 invisible'
                  }}>
                    <div>
                    <h3> Upload Profile Image </h3>
                      <input type="file" name="myImage"  id="imageUpload" className="form-control my-4" accept="image/png, image/jpeg, image/jpg"/>
                      <input type="submit" className="form-control btn btn-success w-50" value="Upload Photo"/>                      
                      </div>
                  </form>                 
                  </div>
                  <div className="dismiss text-end"><RiCloseCircleLine onClick={() => {document.getElementById('changeProfilePic').className = 'z-i100 invisible';}} /></div>
                </div>
              </div>
              <div className="mt-2 ms-3 editInfo">                
                <div className="d-flex">
                  <div className="label">Name: </div><div className="profileinfo">{user.name}</div>
                </div>
                <div className="d-flex">
                  <div className="label">Email: </div><div className="profileinfo">{user.email}</div>
                </div>
                <div className="p-info-icon"><FaEdit /></div>
              </div>
            </div>
            <AddAbouts userId={user._id} />            
          </div>
        </div>
        <div className="w-25 mx-5 ps-3 border-start border-dark">
          <Link type="button" className="home-btn" to="/"><FaHome /></Link>
          <FriendsList userId={user._id} setMFriends={setMFriends} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
