const { Post, postSchema, validatePost } = require("../models/post");
const { User } = require("../models/user")
const express = require("express");
const router = express.Router();

// POST new post
router.post("/", async (req, res) => {
    try {
        const { error } = validatePost(req.body);       
        if (error) return res.status(400).send(error);
        
        // let user = await User.findById(req.params.userId);
        // if (user)
        // return res.status(400).send(`New post entered`);
           
        let newPost = await new Post(req.body);  
        // user.posts.push(newPost);
        await newPost.save();        
        return res.status(201).send(newPost);        
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});


//GET all posts


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

//POST new comment


//GET comments


//PUT comment replies


module.exports = router;