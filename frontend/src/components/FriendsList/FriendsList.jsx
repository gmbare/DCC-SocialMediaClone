import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

export default function FriendsList() {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [friendsNames, setFriendsNames] = useState([]);
  const [pendingFriends, setPendingFriends] = useState([]);
  const [pendingFriendsNames, setPendingFriendsNames] = useState([]);
  const [followed, setFollowed] = useState([]);

  const getFriends = async () => {
    try {
      await axios.get(
        `http://localhost:3008/api/users/${user._id}/friends`
      ).then( async (friendList) => {
        setFriends(friendList.data)
        const friendListNames = await axios.get(`http://localhost:3008/api/users/namefromid`, {params: {"_ids" : friendList.data}})
        setFriendsNames(friendListNames.data)
      })
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

  const getPendingFriends = async () => {
    try {
      await axios.get(
        `http://localhost:3008/api/users/${user._id}/pendingFriends`
      ).then( async (pendingFriendList) => {
      setPendingFriends(pendingFriendList.data);
      const pendingfriendListNames = await axios.get(`http://localhost:3008/api/users/namefromid`,  {params: {"_id":pendingFriendList.data}})
      setPendingFriendsNames(pendingfriendListNames.data)
      console.log(pendingfriendListNames);
      })
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFriends();
    getPendingFriends();
  }, []);

  return (
    <div>
      <h2>
        Friends List 
      </h2>
      <div>
        <ul className="list-group">
          {friendsNames.map((friend,index) => {
            return  (
            <li className="list-group-item" key={index}>{friend}</li>)
          })}
        </ul>
        <div>
            <h2>
                Pending Friends
            </h2>
            <ul className="list-group">
          {pendingFriendsNames.map((pendingFriend,index) => {
            return  (
            <li className="list-group-item" key={index}>{pendingFriend}</li>)
          })}
            </ul>
        </div>
      </div>
    </div>
    
  );
}