const { User, validateLogin, validateUser } = require("../models/user");
const { Post } = require("../models/post");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const fileUpload = require("../middleware/file-upload");

const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

//* POST register a new user and upload image via middleware
router.post("/register",
fileUpload.single("image"),
 async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send(`Email ${req.body.email} already claimed!`);

    const salt = await bcrypt.genSalt(10);
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, salt),
      isAdmin: req.body.isAdmin,
      image: req.file.path
    });

    await user.save();
    const token = user.generateAuthToken();
    return res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        image: user.image,
      });
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

// POST a valid login attempt
// when a user logs in, a new JWT token is generated and sent if their email/password credentials are correct
router.post("/login", async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send(`Invalid email or password.`);

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    const token = user.generateAuthToken();
    return res.send(token);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

// Get all users
router.get("/", [auth], async (req, res) => {
  try {
    console.log(req.user);
    const users = await User.find();
    return res.send(users);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

// DELETE a single user from the database
router.delete("/:userId", [auth, admin], async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user)
      return res
        .status(400)
        .send(`User with id ${req.params.userId} does not exist!`);
    await user.remove();
    return res.send(user);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

// GET all friends
router.get("/:userId/friends", async (req, res) => {
  try{
    const user = await User.findById(req.params.userId);
    if (!user)
    return res.status(400)
    .send(`User with id ${req.params.userId} does not exist!`);
    return res.send(user.friends);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

// GET all pendingFriends
router.get("/:userId/pendingFriends", async (req, res) => {
  try{
    const user = await User.findById(req.params.userId);
    if (!user)
    return res.status(400)
    .send(`User with id ${req.params.userId} does not exist!`);
    return res.send(user.pendingFriends);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.put("/:ownerId/pendfriend/:friendId", async (req, res) => {
  try {       
      let user = await User.findById(req.params.ownerId);        
      if (!user) return res.status(400).send(`User does not exist!`) 
      console.log(req.params.friendId)
      user.pendingFriends.push(req.params.friendId);
      await user.save();        
      return res.status(200).send(user);        
  } catch (error) {
      return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

router.put("/:ownerId/friend/:friendId", async (req, res) => {
  try {       
      let user = await User.findById(req.params.ownerId);        
      if (!user) return res.status(400).send(`Owner does not exist!`) 
      user.friends.push(req.params.friendId);
      let arr = user.pendingFriends;
      for(let i = 0; i < arr.length; i++){
        if (arr[i] === req.params.friendId){
          arr.splice(i,1);
        }
      }
      await user.save();        
      return res.status(200).send(user);        
  } catch (error) {
      return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

router.put("/:ownerId/removefriend/:friendId/list/:list", async (req, res) => {
  try {       
      let user = await User.findById(req.params.ownerId);        
      if (!user) return res.status(400).send(`User does not exist!`) 
      let list = req.params.list
      if(list == "pending"){
          let arr = user.pendingFriends;
          for(let i = 0; i < arr.length; i++){
            if (arr[i] === req.params.friendId){
            arr.splice(i,1);
          }
        }
      } else if(list == "approved"){
          let arr = user.friends;
          for(let i = 0; i < arr.length; i++){
          if (arr[i] === req.params.friendId){
            arr.splice(i,1);
          }
        }
      }
      
      await user.save();        
      return res.status(200).send(user);        
  } catch (error) {
      return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

module.exports = router;
