import React, { useState, useEffect } from "react";
import axios from 'axios';
import './MainFeed.css'

function MainFeed(props){
    const [Post, setPost] = useState([]);

    async function getPosts () {
        let response = await axios.get(`http://localhost:3008/api/posts/postsfromid`, {params:{_ids:props.mFriends}}) ;
            // console.log(response.data);
            setPost(response.data);
        }


    useEffect(() => {
        getPosts();
    },[props.mFriends]);
if (props.mFriends != null){
    return(
    <div className="w-75 p-0 m-2">        
        <div align="center">
            {Post.map((posts, index) => {
          return (
              <div className="postholder p-2 mb-5 border border-warning" key={index}>           
              {/* {console.log(posts)} */}
                <p>{posts.name}</p>
                {posts.post.map((entry) => {
                  return(
                  <div>
                  <img src="../images/burger.jpg" alt={`image-${entry._id}`} />
                  <p >{entry.message}</p></div>  
                )})}             
              </div>
            )
          })        
        }  
        </div>
    </div>
    )
}
else{
  return (<div>No Posts Found</div>)
}
}

export default MainFeed;