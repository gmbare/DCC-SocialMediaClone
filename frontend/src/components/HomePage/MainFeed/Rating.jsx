import React, { useEffect } from "react";
import axios from 'axios';
import './Rating.css';
import { FaStar } from 'react-icons/fa';

const Rating = (props) => {

  const alterStarRating = async (rating) => {
      await axios.put(`http://localhost:3008/api/posts/${props.postId}/stars/${rating}`)
      props.getPosts();
  }

    function handleRating(event, rating){
      event.preventDefault();
      alterStarRating(rating)
      }     

       
      
    return ( 
        <div>        
          <div className="stars text-center">Rate this burger:</div>
          <div className="starholder">
              <form id={`stars${props.postId}`}>
                <label htmlFor="star-1"><FaStar /></label>
                  <input id="star-1" className="star" name="stars" type="radio" value="1" onChange={(event) => handleRating(event,1)} />
                <label htmlFor="star-2"><FaStar /></label>
                  <input id="star-2" className="star" name="stars" type="radio" value="2" onChange={(event) => handleRating(event,2)} />
                <label htmlFor="star-3"><FaStar /></label>
                  <input id="star-3" className="star" name="stars" type="radio" value="3" onChange={(event) => handleRating(event,3)} />
                <label htmlFor="star-4"><FaStar /></label>
                  <input id="star-4" className="star" name="stars" type="radio" value="4" onChange={(event) => handleRating(event,4)} />
                <label htmlFor="star-5"><FaStar /></label>
                  <input id="star-5" className="star" name="stars" type="radio" value="5" onChange={(event) => handleRating(event,5)} />                            
              </form>
          </div>
        </div>
      );
  }
   
export default Rating;