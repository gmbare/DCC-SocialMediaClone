import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

export default function FriendsList() {
    const { user } = useContext(AuthContext);
    const [friends, setFriends] = useState([]);
    const [followed, setFollowed] = useState([]);



    const getFriends = async () => {
        try{
                const friendList = await axios.get(`"http://localhost:3008/api/users/${user._id}/friends`);
                setFriends(friendList.data);
                console.log(friends)
            } catch(err) {
                console.log(err);
            }
        };

    useEffect(() => {
        getFriends();
    },[])

    return <h1 className="container">Home Page for {JSON.stringify(friends)}!</h1>;
    }
        
































// const FriendsList  = (props) => {
    
//   return (
//     <div class="container">
//     <div class="row">
//         <div class="col-md-8">
//             <div class="people-nearby">
              
//               <div class="nearby-user">
//                 <div class="row">
//                   <div class="col-md-2 col-sm-2">
                   
//                   </div>
//                   <div class="col-md-7 col-sm-7">
//                     <h5><a href="#" class="profile-link">friend1</a></h5>
                   
//                   </div>
//                   <div class="col-md-3 col-sm-3">
//                     <button class="btn btn-primary pull-right">Add Friend</button>
//                   </div>
//                 </div>
//               </div>
//               <div class="nearby-user">
//                 <div class="row">
//                   <div class="col-md-2 col-sm-2">
                    
//                   </div>
//                   <div class="col-md-7 col-sm-7">
//                     <h5><a href="#" class="profile-link">friend2</a></h5>
                    
                    
//                   </div>
//                   <div class="col-md-3 col-sm-3">
//                     <button class="btn btn-primary pull-right">Add Friend</button>
//                   </div>
//                 </div>
//               </div>
//               <div class="nearby-user">
//                 <div class="row">
//                   <div class="col-md-2 col-sm-2">
                    
//                   </div>
//                   <div class="col-md-7 col-sm-7">
//                     <h5><a href="#" class="profile-link">friend3</a></h5>
                   
//                   </div>
//                   <div class="col-md-3 col-sm-3">
//                     <button class="btn btn-primary pull-right">Add Friend</button>
//                   </div>
//                 </div>
//               </div>
//               <div class="nearby-user">
//                 <div class="row">
//                   <div class="col-md-2 col-sm-2">
                   
//                   </div>
                  
//                 </div>
//               </div>
//               <div class="nearby-user">
//                 <div class="row">
//                   <div class="col-md-2 col-sm-2">
                    
//                   </div>
//                   <div class="col-md-7 col-sm-7">
//                     <h5><a href="#" class="profile-link">friend4</a></h5>
                    
//                   </div>
//                   <div class="col-md-3 col-sm-3">
//                     <button class="btn btn-primary pull-right">Add Friend</button>
//                   </div>
//                 </div>
//               </div>
//               <div class="nearby-user">
//                 <div class="row">
//                   <div class="col-md-2 col-sm-2">
                    
//                   </div>
//                   <div class="col-md-7 col-sm-7">
//                     <h5><a href="#" class="profile-link">friend5</a></h5>
                   
//                   </div>
//                   <div class="col-md-3 col-sm-3">
//                     <button class="btn btn-primary pull-right">Add Friend</button>
//                   </div>
//                 </div>
//               </div>
              
                  
//                 </div>
//               </div>
//             </div>
//     	</div>
	

    
        

//   )
// }


