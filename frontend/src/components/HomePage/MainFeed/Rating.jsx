import React, { useEffect } from "react";
import axios from 'axios';
import './Rating.css';
import { FaStar } from 'react-icons/fa';

const Rating = (props) => {
    async function handleRating(event,rating){
      event.preventDefault();
      let newRating = await axios.put(`http://localhost:3008/api/posts/${props.postId}/stars/${rating}`)
        props.getPosts();
        //document.getElementsByName('stars').disabled = true;
      }            
      
    return ( 
        <div>        
          <div className="stars text-center">Rate this burger:</div>
          <div className="starholder">
              <form id={`stars${props.postId}`}>
                <label>
                  <FaStar /><input id="star-1" className="star" name="stars" type="radio" value="1" onChange={(event) => handleRating (event,1)} />
                </label>                  
                <label>
                  <FaStar /><input id="star-2" className="star" name="stars" type="radio" value="2" onChange={(event) => handleRating (event,2)} />
                </label>
                <label>
                  <FaStar /><input id="star-3" className="star" name="stars" type="radio" value="3" onChange={(event) => handleRating (event,3)} />
                </label>
                <label>
                  <FaStar /><input id="star-4" className="star" name="stars" type="radio" value="4" onChange={(event) => handleRating (event,4)} />
                </label>
                <label>
                  <FaStar /><input id="star-5" className="star" name="stars" type="radio" value="5" onChange={(event) => handleRating (event,5)} />
                </label>
              </form>
          </div>
        </div>
      );
  }
   
export default Rating;