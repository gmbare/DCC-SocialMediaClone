import React, { useEffect } from "react";
import axios from 'axios';
import './Rating.css';
import { FaStar } from 'react-icons/fa';

const Rating = (props) => {
    async function handleRating(event,rating){
      event.preventDefault();
      let newRating = await axios.put(`http://localhost:3008/api/posts/${props.postId}/stars/${rating}`)
        props.getPosts();
        document.getElementsByName('stars').disabled = true;
      }      
      useEffect(() => {
        handleRating();
        },[props.postId])  
      
    return ( 
        <div>        
          <div className="stars text-center">Rate this burger:</div>
          <div className="starholder">
              <form id="stars">
                <label for="star-1"><FaStar /></label>
                  <input id="star-1" class="star" name="stars" type="radio" value="1" onChange={(event) => handleRating (event,1)} />
                <label for="star-2"><FaStar /></label>
                  <input id="star-2" class="star" name="stars" type="radio" value="2" onChange={(event) => handleRating (event,2)} />
                <label for="star-3"><FaStar /></label>
                  <input id="star-3" class="star" name="stars" type="radio" value="3" onChange={(event) => handleRating (event,3)} />
                <label for="star-4"><FaStar /></label>
                  <input id="star-4" class="star" name="stars" type="radio" value="4" onChange={(event) => handleRating (event,4)} />
                <label for="star-5"><FaStar /></label>
                  <input id="star-5" class="star" name="stars" type="radio" value="5" onChange={(event) => handleRating (event,5)} />                            
              </form>
          </div>
        </div>
      );
  }
   
export default Rating;