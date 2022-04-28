const mongoose = require("mongoose");
const Joi = require("joi");

const starSchema = new mongoose.Schema({
    likerId: {type:String},
    starRating: {type:Number},
});

const Star = mongoose.model("Star", starSchema);


function validateStar(about){
    const schema = Joi.object({
        likerId: Joi.string(),
        starRating: Joi.number()
    });
    return schema.validate(about);
    };
    module.exports = {
        starSchema, 
        Star,
        validateStar
    }
















    