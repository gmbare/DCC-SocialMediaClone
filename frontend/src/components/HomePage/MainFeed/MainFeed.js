import React, { useState, useEffect } from "react";
import axios from 'axios';
import './MainFeed.css';
import { FaStar } from 'react-icons/fa';
import Rating from "./Rating";

function MainFeed(props){
    const [Post, setPost] = useState([]);
    async function getPosts () {
        let response = await axios.get(`http://localhost:3008/api/posts/${props.userId}`) ;
            console.log(response.data);
            setPost(response.data);
        }
    useEffect(() => {
        getPosts();
    },[]);

    return(
    <div className="w-75 p-0 m-2">        
        <div align="center">
            {Post.map((posts) => {
               let totalStars = posts.star1 + (posts.star2*2) + (posts.star3*3) + (posts.star4*4) + (posts.star5*5);
               let numRatings = posts.star1 + posts.star2 + posts.star3 + posts.star4 + posts.star5;
               let avgStars = totalStars / numRatings;
               avgStars = parseFloat(avgStars).toFixed(2);
          return (                         
              <div className="postholder p-2 mb-5 border border-warning" key={posts._id}>
                <Rating postId={posts._id} getPosts={getPosts} />
                <img src="../images/burger.jpg" alt={`image-${posts._id}`} />                            
                <div className="message"><p>{posts.message}</p><div className="currentrating">Rating: {avgStars}<FaStar className="icon" /></div></div>               
              </div>
            )
          })        
        }   
        </div>
    </div>
    )
}

export default MainFeed;