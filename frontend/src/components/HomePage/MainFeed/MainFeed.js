import React, { useState, useEffect } from "react";
import axios from 'axios';
import './MainFeed.css';
import './Rating.css'
import { FaStar } from 'react-icons/fa';
import Rating from "./Rating";
import AddPost from "./AddPost";

function MainFeed(props) {
  const [Post, setPost] = useState([]);



  function updateLikes(posterior) {
    let colorUpdater = (posterior.map((post) => {
      // console.log(post)
      if (post.post.stars.find(item => item.likerId === props.userId)){
        let test = post.post.stars.find(item => {if (item.likerId === props.userId) return item.starRating})
        // console.log(test)
        return({postId:post.post._id, postPost: test})
      }
      else{
        return ("")
      }
    }))
    
    colorUpdater.map((post) => {
      if (post != ""){
        // console.log(post)
        for (let i = 0; i< 5; i++){
          document.getElementById(`starL-${i+1}${post.postId}`).className = 'unHighlighted'
        }
        for (let i = post.postPost.starRating;i > 0; i--){
          // console.log(`starL-${i}${post.postId}`)
          document.getElementById(`starL-${i}${post.postId}`).className = 'Highlighted'
        }

      }
    })

  }


  const getPosts = async () => {
    if (props.mFriends != null) {
       
      let response = await axios.get(`http://localhost:3008/api/posts/postsfromid`, { params: { _ids: [...props.mFriends, props.userId] } });
      let posterior = ((function () {
        let fullArray = []
        response.data.map((entry => { return entry.post.map((splitEntry) => { return fullArray.push({ "name": entry.name, "post": splitEntry }) }) }))
        return ((function () {
          let sortArray = new Array(fullArray.length)
          for (let i in fullArray) {
            let placement = 0
            for (let x in fullArray) {
              if (x == i) {
              }
              else if (Date.parse(fullArray[i].post.dateAdded) < Date.parse(fullArray[x].post.dateAdded)) {
                placement++
              }
              else if (Date.parse(fullArray[i].post.dateAdded) == Date.parse(fullArray[x].post.dateAdded)) {
                placement++
              }
            }
            while (sortArray[placement] && (0 < placement || placement < 10)) {
              placement--
            }
            sortArray[placement] = fullArray[i]
          }
          return sortArray
        })())
      })());
      setPost(posterior)
    // console.log('Hello')
      updateLikes(posterior);
    }
  }



  useEffect(() => {
    getPosts();
  }, [props.mFriends]);

  if (props.mFriends != null) {
    return (
      <div className="w-75 p-0 m-2">
        <div align="center">
          <AddPost userId={props.userId} getPosts={getPosts} />
          {Post.map((posts, index) => {
            let avgStars = parseFloat((function () {
                  let total = 0
                  for (let i in posts.post.stars){
                    total += posts.post.stars[i].starRating
                  }
                  return (total/posts.post.stars.length)         
                })()).toFixed(2)

            // console.log(avgStars)
            // let avgStars = totalStars / numRatings;
            // avgStars = parseFloat(avgStars).toFixed(2);
            //  console.log(`${posts.message} STARS:${avgStars}`)
            return (
              <div className="postholder p-2 mb-5 border border-warning" key={index}>
                {/* {console.log(posts)} */}
                <p>{posts.name}</p> <p>{posts.post.dateAdded}</p>
                <div>
                  <Rating postId={posts.post._id} userId={props.userId} getPosts={getPosts} />
                  <img src="../images/burger.jpg" alt={`image-${posts._id}`} />
                  <div className="message"><p>{posts.post.message}</p><div className="currentrating">Rating: {avgStars}<FaStar className="icon" />
                  </div>
                  </div>
                </div>
              </div>
            )
          })
          }
        </div>
      </div>
    )
  }
  else {
    return (<div>No Posts Found</div>)
  }
}

export default MainFeed;