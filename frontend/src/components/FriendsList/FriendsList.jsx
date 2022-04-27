import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

export default function FriendsList() {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [pendingFriends, setPendingFriends] = useState([]);
  const [followed, setFollowed] = useState([]);

  const getFriends = async () => {
    try {
      const friendList = await axios.get(
        `http://localhost:3008/api/users/${user._id}/friends`
      );
      setFriends(friendList.data);
      console.log(friends);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

  const getPendingFriends = async () => {
    try {
      const pendingFriendList = await axios.get(
        `http://localhost:3008/api/users/${user._id}/pendingFriends`
      );
      setPendingFriends(pendingFriendList.data);
      console.log(pendingFriends);
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
          {friends.map((friend,index) => {
            return  (
            <li className="list-group-item" key={index}>{friend}</li>)
          })}
        </ul>
        <div>
            <h2>
                Pending Friends
            </h2>
            <ul className="list-group">
          {pendingFriends.map((pendingFriend,index) => {
            return  (
            <li className="list-group-item" key={index}>{pendingFriend}</li>)
          })}
            </ul>
        </div>
      </div>
    </div>
    
  );
}