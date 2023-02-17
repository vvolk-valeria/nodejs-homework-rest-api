const mongoose = require('mongoose');

const Joi = require('joi');


const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
}, {versionKey: false, timestamps: true});



const joiSignupSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().min(5).required(), 
  subscription: Joi.string().valueOf("starter", "pro", "business"),
  token: Joi.string()
});

const joiLoginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().min(5).required(), 
});
  

const joiSchemes = {
  joiSignupSchema,
  joiLoginSchema,
};


const User = mongoose.model('user', userSchema);


module.exports = {
  User,
  joiSchemes
}