import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";




const FriendsList = (props) => {

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


const acceptFriend = async (e,friendId) => {
  const acceptedFriend = await axios.put(`/${user.Id}/friend/${friendId}`)
}

  useEffect(() => {
    getFriends();
    getPendingFriends();
  }, []);

    



  

  return (
    <div><h2>
                Pending Friends 
            </h2>
            <ul  className="list-group">
            {/* <ul onSubmit={addFriendButton} className="list-group"> */}
          {pendingFriends.map((pendingFriend,index) => {
            return  (
              
            <li className="list-group-item" key={index}>{pendingFriend} 
            {/* <form onSubmit={(e) => props.handleAddFriend(e, props.index)}>
              <input type="hidden" value={pendingFriend} />
              <input type="submit" value="Add" />
            </form>   */}
            </li>
            )
          })}
            </ul>
      <h2>
        Friends 
      </h2>
      <div>
        
        <ul className="list-group">
          {friendsNames.map((friend,index) => {
            return  (
            < li className="list-group-item" key={index}>{friend} <button>Add</button> <button>Deny</button>  </li>
           
            )
          })}
       
            </ul>
        </div>
      </div>
    
    
  );
}


 
export default FriendsList;



  