const { Post, postSchema, validatePost } = require("../models/post");
const { User } = require("../models/user")
const express = require("express");
const router = express.Router();

// POST new post
router.post("/", async (req, res) => {
    try {
        const { error } = validatePost(req.body);       
        if (error) return res.status(400).send(error);           
        let newPost = await new Post(req.body);  
        // user.posts.push(newPost);
        await newPost.save();        
        return res.status(201).send(newPost);        
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});

//GET all friends posts
router.get("/friendsPosts", async (req, res) => {
    try {
        for(i in req.body.friendList){
            let friendsPosts = await Post.find({ownerId:req.body.friendList[i]})
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
        if (req.stars == 1){
            post.star1++;
        } else if (req.stars == 2){
            post.star2++;
        } else if (req.stars == 3){
            post.star3++;
        } else if (req.stars == 4){
            post.star4++;
        } else if (req.stars == 5){
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

//POST new comment


//GET comments


//PUT comment replies


module.exports = router;