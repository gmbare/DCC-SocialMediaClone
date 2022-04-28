const mongoose = require("mongoose");
const Joi = require("joi");

/*const replySchema = new mongoose.Schema({
    message: {type:String, minlength: 2, maxlength:1028},
    dateAdded: {type:Date, default: Date.now()},    
  }); 

const commentSchema = new mongoose.Schema({
  message: {type:String, minlength: 2, maxlength:1028},
  replies: [{type:replySchema}],
  dateAdded: {type:Date, default: Date.now()},   
});*/

const postSchema = mongoose.Schema({
  message: { type: String, required: true, minLength:5, maxlength:1028 },
  ownerId: { type: String, required: true},
  image: {type: String},
  stars:{'likerId':{type: String}, 'starRating':{type: Number}},
  star1: {type: Number,default: 0},
  star2: {type: Number,default: 0},
  star3: {type: Number,default: 0},
  star4: {type: Number,default: 0},
  star5: {type: Number,default: 0},
  likes: {type: Number,default: 0},
  dislikes: {type: Number,default: 0}, 
  dateAdded: {type:Date, default: Date.now()},
  });


function validatePost(post){
  const schema = Joi.object({
    dateAdded: Joi.date(),
      message: Joi.string().min(5).max(1028).required(),
      image: Joi.string(),
      ownerId: Joi.string()                
  });
  return schema.validate(post);
};

/*function validateComment(comment){
  const schema = Joi.object({
      message: Joi.string().min(2).max(255)              
  });
  return schema.validate(comment);
};

function validateReply(reply){
    const schema = Joi.object({
        message: Joi.string().min(2).max(255)              
    });
    return schema.validate(comment);
  };*/

const Post = mongoose.model("Post", postSchema);
//const Comment = mongoose.model("Comment", commentSchema);
//const Reply = mongoose.model("Reply", replySchema);

module.exports = {
    Post,
    postSchema,
    validatePost,
};