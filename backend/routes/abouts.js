const { User, validateLogin, validateUser } = require("../models/user");
const {About, validateAbout} = require("../models/about")

// const auth = require("../middleware/auth");

const express = require("express");
// const { commentSchema } = require("../models/post");
// const { aboutMeSchema } = require("../models/aboutMe");
const router = express.Router();



// POST about me to Authorized user
router.post("/:userId", async (req, res) => {
    try {
      let {error} = validateAbout(req.body);
      if (error) return res.status(400).send(`Your About me status had the following errors: ${error}`)

      const user = await User.findById(req.params.userId);
      if (!user)
        return res
          .status(400)
          .send(`User with id ${req.params.userId} does not exist!`);

      const newAboutMe = await About(req.body);
      user.about = newAboutMe

      await user.save()
      return res.status(201).send(user);

    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });















//   router.put("/about/:userId", [ auth ], async (req, res) => {
//     try {
//     const user = await User.findById(req.params.userId);
//     if (!user)
//       return res
//         .status(400)
//         .send(`User with id ${req.params.userId} does not exist!`);

    
//     await aboutMeSchema.update();
//     return res.send(user);
//   } catch (ex) {
//     return res.status(500).send(`Internal Server Error: ${ex}`);
//   }
// });

module.exports = router;
