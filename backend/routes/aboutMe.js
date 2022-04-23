const { User, validateLogin, validateUser } = require("../models/user");
const {About, validateAbout} = require("../models/aboutMe")


const express = require("express");
const router = express.Router();

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


module.exports = router;
      
        
          
          
    
   