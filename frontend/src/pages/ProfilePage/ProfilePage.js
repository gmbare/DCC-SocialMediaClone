import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import FriendsList from "../../components/FriendsList/FriendsList";
import AddAbouts from "../../components/AboutMe/AboutMe";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { RiImageEditFill } from "react-icons/ri";
import "./ProfilePage.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import FormData from "form-data";
import burgerbackground from "../Assets/burgerbackground.mp4";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [mFriends, setMFriends] = useState();
  let location = useLocation();
  const [userImage, setUserImage] = useState(`uploads\\images\\burger.jpg`);

  const getUserImage = async () => {
    console.log(user._id);
    let img = await axios.get(
      `http://localhost:3008/api/abouts/profilepic/${user._id}`
    );

    if (img.data.length > 0) {
      setUserImage(img.data);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    var bodyFormData = new FormData();
    bodyFormData.append(
      "image",
      document.getElementById("imageUpload").files[0]
    );
    console.log(bodyFormData.get("image"));
    pushUserImage(bodyFormData);
  }
  const pushUserImage = async (bodyFormData) => {
    await axios({
      method: "post",
      url: `http://localhost:3008/api/abouts/profilepic/${user._id}`,
      data: bodyFormData,
      headers: { encType: "multipart/form-data" },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      });

    getUserImage();
  };

  useEffect(() => {
    getUserImage();
  }, []);

  return (
    <section className="video">
      <video className="bgvideo" src={burgerbackground} autoPlay loop muted />
      <Link type="button" className="home-btn" to="/">
        <FaHome /><p className="hom">Home</p>
      </Link>
      
      <AddAbouts className="container" userId={user._id} />
      <div className="m-5 ps-3 border-start border-dark pos-sticky">
        <div className="col">
          <div className="col">
            <div className="col">
              <div className="col">
                <button>
                  <img
                    className="z-i100"
                    src={`http://localhost:3008/backend/${userImage}`}
                    alt={`image-${user._id}`}
                    onClick={() => {
                      if (
                        document.getElementById("changeProfilePic").className ==
                        "z-i100 visible"
                      ) {
                        document.getElementById("changeProfilePic").className =
                          "z-i100 invisible";
                      } else if (
                        document.getElementById("changeProfilePic").className ==
                        "z-i100 invisible"
                      ) {
                        document.getElementById("changeProfilePic").className =
                          "z-i100 visible";
                      }
                    }}
                  />
                </button>
                <div className="z-i100 invisible" id="changeProfilePic">
                  <p className="upload"> Upload Image </p>
                  <form
                    onSubmit={(e) => {
                      handleSubmit(e);
                      document.getElementById("changeProfilePic").className =
                        "z-i100 invisible";
                    }}
                  >
                    <input
                      type="file"
                      name="myImage"
                      id="imageUpload"
                      accept="image/png, image/jpeg, image/jpg"
                    />
                    <input type="submit" value="Upload Photo" />
                  </form>
                </div>
              </div>
              <div className="mt-2 ms-3 editInfo">
                <div className="d-flex"></div>
                <div className="d-flex"></div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <FriendsList
            className="friendborder"
            userId={user._id}
            setMFriends={setMFriends}
          />
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
