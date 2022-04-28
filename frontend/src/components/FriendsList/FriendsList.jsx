import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";




const FriendsList = (props) => {

  const { user } = useContext(AuthContext);
  // const { owner } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [pendingFriends, setPendingFriends] = useState([]);
  // const [followed, setFollowed] = useState([]);

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

    
//   async function addFriendButton (event) {
//     event.preventDefault();
    
//     const put = {put: event.target.put.value};
//     const url = `http://localhost:3011/api/users/${user._id}/newPost`;
//     let res = await axios.put(`http://localhost:3011/api/users/${owner._id}/friend/${user._id}`); 

//     console.log(res)
// };


  

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
          {friends.map((friend,index) => {
            return  (
            < li className="list-group-item" key={index}>{friend} <button>Delete</button>  </li>
           
            )
          })}
        </ul>
        <div>
            
        </div>
      </div>
    </div>
    
  );
}


 
export default FriendsList;



  