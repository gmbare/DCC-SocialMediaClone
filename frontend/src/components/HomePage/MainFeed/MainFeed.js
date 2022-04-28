import React, { useState, useEffect } from "react";
import axios from 'axios';
import './MainFeed.css';
import { FaStar } from 'react-icons/fa';
import Rating from "./Rating";
import AddPost from "./AddPost";

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
            <AddPost userId={props.userId} />
            {Post.map((posts, index) => {
               let totalStars = posts.post.star1 + (posts.post.star2*2) + (posts.post.star3*3) + (posts.post.star4*4) + (posts.post.star5*5);
               let numRatings = posts.post.star1 + posts.post.star2 + posts.post.star3 + posts.post.star4 + posts.post.star5;
               let avgStars = totalStars / numRatings;
               avgStars = parseFloat(avgStars).toFixed(2);
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