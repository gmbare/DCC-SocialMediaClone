import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function FriendsList({ user }) {
    const [friends, setFriends] = useState([]);
    const [followed, setFollowed] = useState([]);



useEffect(() => {
    const getFriends = async () => {
        try{
            const friendList = await axios.get("http://localhost:3008/api/users");
            setFriends(friendList.data);
        } catch(err) {
            console.log(err);
        }
    };
    getFriends();
})
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


