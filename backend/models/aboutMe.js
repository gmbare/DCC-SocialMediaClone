const mongoose = require("mongoose");


const aboutMeSchema = mongoose.Schema({
    about: { type: String, required: true, minLength: 50, maxLength: 1000 },
    _id: { type: String, required: true,}
  })

module.exports.aboutMeSchema = aboutMeSchema;