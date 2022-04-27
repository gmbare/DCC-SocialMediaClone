import React, { useState, useEffect } from "react";
import axios from 'axios';
import './MainFeed.css'

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
          return (                         
              <div className="postholder p-2 mb-5 border border-warning" key={posts._id}>
                <img src="../images/burger.jpg" alt={`image-${posts._id}`} />
                <div><p>{posts.message}</p></div>               
              </div>
            )
          })        
        }   
        </div>
    </div>
    )
}

export default MainFeed;