const { Post, postSchema, validatePost } = require("../models/post");
const { User } = require("../models/user")
const express = require("express");
const router = express.Router();

// POST new post
router.post("/testMe", async (req, res) => {
    try {
<<<<<<< HEAD
        return("Hallelujah")
        const { error } = validatePost(req.body);
        if (error) return res.status(400).send(error);

        let newPost = await new Post(req.body);
        await newPost.save();

        return res.status(201).send(newPost);
=======
        const { error } = validatePost(req.body);       
        if (error) return res.status(400).send(error);           
        let newPost = await new Post(req.body); 
        await newPost.save();        
        return res.status(201).send(newPost);        
>>>>>>> fd7fe75184905415a5b959d05608cc45c83772c0
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});

//GET all owner's posts
router.get("/:ownerId", async (req, res) => {
    try {
        let ownerPosts = await Post.find({ownerId:req.params.ownerId});
        if (!ownerPosts) return res.status(400).send("No posts yet! Why don't you add one?");
        return res.status(200).send(ownerPosts);
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});

//GET all friends' posts
router.get("/friendsPosts", async (req, res) => {
    try {
        for(i in req.body.friends){
            let friendsPosts = await Post.find({ownerId:req.body.friends[i]})
            return res.status(200).send(friendsPosts)
        }
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});

//PUT STAR rating
router.put("/:postId/stars/:stars", async (req, res) => {
    try {       
        let post = await Post.findById(req.params.postId);        
        if (!post) return res.status(400).send(`Post does not exist!`) 
        if (req.params.stars == "1"){
            post.star1++;
        } else if (req.params.stars == "2"){
            post.star2++;
        } else if (req.params.stars == "3"){
            post.star3++;
        } else if (req.params.stars == "4"){
            post.star4++;
        } else if (req.params.stars == "5"){
            post.star5++;
        }        
        await post.save();        
        return res.status(200).send(post);        
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});

//PUT post (Add likes, dislikes, star rating)
router.put("/:postId/likes", async (req, res) => {
    try {       
        let post = await Post.findById(req.params.postId);        
        if (!post) return res.status(400).send(`Post does not exist!`)        
        post.likes++;        
        await post.save();        
        return res.status(200).send(post);        
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});

//PUT Dislikes
router.put("/:postId/dislikes", async (req, res) => {
    try {       
        let post = await Post.findById(req.params.postId);        
        if (!comment) return res.status(400).send(`Post does not exist!`)        
        post.dislikes++;        
        await post.save();        
        return res.status(200).send(post);        
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});

// DELETE User Post
router.delete("/:userId/deletePost/:postId", async (req, res) => {
    try {
        await Post.deleteOne({ _id: req.params.postId }); 
        
      res.send("Deleted Post")
      
    } catch (err) {
      res.status(500).send(err);
    }
  });
    
       
        


module.exports = router;



