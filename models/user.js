const mongoose = require('mongoose');

const Joi = require('joi');
const subscriptionArray = ['starter', 'pro', 'business'];

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
    enum: subscriptionArray,
    default:'starter'
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    required: true,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
}, {versionKey: false, timestamps: true});

const joiSignupSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().min(5).required(), 
  subscription: Joi.string().valid(...subscriptionArray),
  token: Joi.string()
});

const joiLoginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().min(5).required(), 
});

const joiVerifyEmailSchema = Joi.object({
  email: Joi.string().min(5).required(), 
});

const joiSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid(...subscriptionArray).required()
});
  

const joiSchemes = {
  joiSignupSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
  joiVerifyEmailSchema
};


const User = mongoose.model('user', userSchema);


module.exports = {
  User,
  joiSchemes
}