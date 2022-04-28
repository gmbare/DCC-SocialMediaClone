import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

<<<<<<< HEAD



const FriendsList = (props) => {

=======
const FriendsList = (props) => {
>>>>>>> e0264e52048101d887a7c67aa300c9886dd62cdf
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
        props.setMFriends(friendList.data)
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
      console.log(user._id)
      await axios.get(
        `http://localhost:3008/api/users/${user._id}/pendingFriends`
      ).then( async (pendingFriendList) => {
      setPendingFriends(pendingFriendList.data);
      const pendingfriendListNames = await axios.get(`http://localhost:3008/api/users/namefromid`,  {params: {"_ids":pendingFriendList.data}})
      setPendingFriendsNames(pendingfriendListNames.data)
      console.log(pendingfriendListNames);
      })
    } catch (err) {
      console.log(err);
    }
  };

<<<<<<< HEAD

const acceptFriend = async (e,friendId) => {
  const acceptedFriend = await axios.put(`/${user.Id}/friend/${friendId}`)
}

  useEffect(() => {
    getFriends();
    getPendingFriends();
=======
  const acceptFriend = async (e,index) => {
    console.log(`http://localhost:3008/api/users/${user._id}/friend/${pendingFriends[index]}`)
    const acceptedFriend = await axios.put(`http://localhost:3008/api/users/${user._id}/friend/${pendingFriends[index]}`)
    getFriends()
    getPendingFriends()
  }

  useEffect(async () => {
    await getFriends();
    await getPendingFriends();
>>>>>>> e0264e52048101d887a7c67aa300c9886dd62cdf
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
<<<<<<< HEAD
            < li className="list-group-item" key={index}>{friend} <button>Add</button> <button>Deny</button>  </li>
           
            )
=======
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
            <li className="list-group-item" key={index}>{pendingFriend}
            {/* <button onClick={((e) => {acceptFriend(e, index)})}>A</button> */}
            {/* <button onClick={((e) => {acceptFriend(e, index)})}>X</button> */}
            </li>)
>>>>>>> e0264e52048101d887a7c67aa300c9886dd62cdf
          })}
       
            </ul>
        </div>
      </div>
    
    
  );
<<<<<<< HEAD
}


 
export default FriendsList;



  
=======
        };
export default FriendsList;
>>>>>>> e0264e52048101d887a7c67aa300c9886dd62cdf
