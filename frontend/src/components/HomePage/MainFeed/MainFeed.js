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
          return (
              <div className="postholder p-2 mb-5 border border-warning" key={index}>           
              {/* {console.log(posts)} */}
                <p>{posts.name}</p>
                {posts.post.map((entry) => {
                  let avgStars
                  try{
                  avgStars = ((function () {
                    let total = 0
                    for (let i in entry.stars){
                      total += entry.stars[i].starRating
                    }
                    return (total/entry.stars.length)         
                  })())
                }catch{
                  let totalStars = entry.star1 + (entry.star2*2) + (entry.star3*3) + (entry.star4*4) + (entry.star5*5);
                  let numRatings = entry.star1 + entry.star2 + entry.star3 + entry.star4 + entry.star5;
                  avgStars = totalStars / numRatings;
                }
               console.log(`${avgStars}`)
               avgStars = parseFloat(avgStars).toFixed(2);
               console.log(`${entry.message} STARS:${avgStars}`)
                  return(
                  <div>
                  <Rating postId={entry._id} getPosts={getPosts} />
                  <img src="../images/burger.jpg" alt={`image-${entry._id}`} />
                  <div className="message"><p>{entry.message}</p><div className="currentrating">Rating: {avgStars}<FaStar className="icon" /></div></div>     
                </div>  
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