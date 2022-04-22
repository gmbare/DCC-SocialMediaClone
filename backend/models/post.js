const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { number } = require("joi");
const { User } = require("../models/user");

const postSchema = mongoose.Schema({
  message: { type: String, required: true, minLength:5, maxlength:1028 },
  image: {type: String},
  star1: {type: Number,default: 0},
  star2: {type: Number,default: 0},
  star3: {type: Number,default: 0},
  star4: {type: Number,default: 0},
  star5: {type: Number,default: 0},
  likes: {type: Number,default: 0},
  dislikes: {type: Number,default: 0}, 
  dateAdded: {type:Date, default: Date.now()},
  comments: [{type:commentSchema}], 
});

const commentSchema = new mongoose.Schema({
  message: {type:String, required: true, minlength: 2, maxlength:1028},
  postId: {type:String, required: true},
  replies: [{type:replySchema}],
  dateAdded: {type:Date, default: Date.now()}, 
  likes: {type:Number,default:0},
  dateAdded: {type:Date, default: Date.now()},
  dislikes: {type:Number,default:0},  
});

const replySchema = new mongoose.Schema({
  message: {type:String, required: true, minlength: 2, maxlength:1028},
  image: {type:String},
  dateAdded: {type:Date, default: Date.now()},    
}); 

function validatePost(post){
  const schema = Joi.object({
      message: Joi.string().min(5).max(1028).required(),
      image: Joi.String,                    
  });
  return schema.validate(post);
};

function validateComment(comment){
  const schema = Joi.object({
      message: Joi.string().min(2).max(255).required(),              
  });
  return schema.validate(comment);
};

const Post = mongoose.model("Post", postSchema);
const Comment = mongoose.model("Comment", commentSchema);
const Reply = mongoose.model("Reply", replySchema);

module.exports = {
    Post,
    Comment,
    Reply,
    postSchema,
    commentSchema,
    replySchema
};