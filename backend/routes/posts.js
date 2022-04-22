const { Post, Comment, Reply, postSchema, commentSchema, replySchema, validatePost, validateComment, validateReply } = require("../models/post");

const express = require("express");
const router = express.Router();

// POST new post
router.post("/testMe", async (req, res) => {
    try {
        return("Hallelujah")
        const { error } = validatePost(req.body);
        if (error) return res.status(400).send(error);

        let newPost = await new Post(req.body);
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
router.put("/:postId/comments", async (req, res) => {
    try {       
        let post = await Post.findById(req.params.postId);        
        if (!post) return res.
            status(400)
            .send(`Post does not exist!`)        
        let newComment = await new Comment(req.body);        
        post.comments.push(newComment);
        post.save();        
        return res.status(200).send(post);        
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});

//GET comments


//PUT comment replies


module.exports = router;