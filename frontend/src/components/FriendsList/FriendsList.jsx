import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import SearchFriend from "./SearchFriend/SearchFriend"
import "./FriendsList.css"

const FriendsList = (props) => {
  const { user } = useContext(AuthContext);
  const [friendsNames, setFriendsNames] = useState([]);
  const [pendingFriends, setPendingFriends] = useState([]);
  const [pendingFriendsNames, setPendingFriendsNames] = useState([]);
  const [friendsPicture, setFriendsPictures] = useState([`uploads\\images\\burger.jpg`, `uploads\\images\\burger.jpg`]);
  const [pendingFriendsPictures, setPendingFriendsPictures] = useState([`uploads\\images\\burger.jpg`]);


  const getFriends = async () => {
    try {
      await axios.get(
        `http://localhost:3008/api/users/${user._id}/friends`
      ).then( async (friendList) => {
        props.setMFriends(friendList.data)
        const friendListNames = await axios.get(`http://localhost:3008/api/users/namefromid`, {params: {"_ids" : friendList.data}})
        setFriendsNames(friendListNames.data)
        const pictureFrames = await axios.get(`http://localhost:3008/api/users/picfromid`, {params: {"_ids" : friendList.data}})
        setFriendsPictures(pictureFrames.data)
      })
    } catch (err) {
      console.log(err);
    }
  };

  const getPendingFriends = async () => {
    try {
      await axios.get(
        `http://localhost:3008/api/users/${user._id}/pendingFriends`
      ).then( async (pendingFriendList) => {
      setPendingFriends(pendingFriendList.data);
      const pendingfriendListNames = await axios.get(`http://localhost:3008/api/users/namefromid`,  {params: {"_ids":pendingFriendList.data}})
      setPendingFriendsNames(pendingfriendListNames.data)
      const pendingPictureFrames = await axios.get(`http://localhost:3008/api/users/picfromid`, {params: {"_ids" : pendingFriendList.data}})
      // console.log(pendingPictureFrames.data)
      setPendingFriendsPictures(pendingPictureFrames.data)
      // console.log(pendingfriendListNames);
      })
    } catch (err) {
      console.log(err);
    }
  };

  const acceptFriend = async (e,index) => {
    // console.log(`http://localhost:3008/api/users/${user._id}/friend/${pendingFriends[index]}`)
    await axios.put(`http://localhost:3008/api/users/${user._id}/friend/${pendingFriends[index]}`)
    getFriends()
    getPendingFriends()
  }

  const denyFriend = async (e,index) => {
    // console.log(`http://localhost:3008/api/users/${user._id}/removefriend/${pendingFriends[index]}/list/pending`)
    await axios.put(`http://localhost:3008/api/users/${user._id}/removefriend/${pendingFriends[index]}/list/pending`)
    getFriends()
    getPendingFriends()
  }   


  useEffect(() => {
      getFriends();
      getPendingFriends();
  }, []);



return (
  <div>
  <div className="">
    <SearchFriend userId={user._id} getPendingFriends={getPendingFriends}/>
  </div>
  <div className="friendslist-placement">
    <div className="mb-3 border-bottom border-danger p-5">
      <h3>Pending Friends</h3>
      <ul className="list-group list-group-flush text-start">
        {pendingFriendsNames.map((pendingFriend, index) => {
          return (
            <li className="list-group-item" key={index}>
              {pendingFriend}
              <button onClick={((e) => {acceptFriend(e, index)})}>A</button>
              <button onClick={((e) => {denyFriend(e, index)})}>X</button>
            </li>
          )
        })
        }
      </ul>
    </div>
    <div className="mb-3 border-bottom border-danger">
      <h3>Friends List</h3>
      <div>
        <ul className="list-group list-group-flush text-start">
          {friendsNames.map((friend, index) => {
            return (
              <li className="list-group-item" key={index}>
              <img src={`http://localhost:3008/backend/${friendsPicture[index]}`}/>  
                {friend}
                
              </li>
            );
          })}
        </ul>
        <div></div>
        </div>
    </div>
  </div>
  </div>
);
};
export default FriendsList;