const { User, validateLogin, validateUser } = require("../models/user");

const auth = require("../middleware/auth");

const express = require("express");
const { aboutMeSchema } = require("../models/aboutMe");
const router = express.Router();



// POST about me to Authorized user
router.post("/about/:userId", [ auth ], async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user)
        return res
          .status(400)
          .send(`User with id ${req.params.userId} does not exist!`);
      await aboutMeSchema.update();
      return res.send(user);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });