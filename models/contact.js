const mongoose = require('mongoose');

const Joi = require('joi');

const phoneRegexp = /^[\(\- ]*\d{3}[\)-\. ]*\d{3}[-\. ]*\d{4}$/;

const contactSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    }
}, {versionKey: false, timestamps: true});


const joiContactSchema = Joi.object({
          name: Joi.string().min(3).max(60).required(),
          email: Joi.string().min(5).max(60).required(), 
          phone: Joi.string().pattern(phoneRegexp).required(),
          favorite: Joi.bool()
});

const joiContactFavoriteSchema = Joi.object({
          favorite: Joi.bool().required()
});
  

const joiSchemes = {
    joiContactSchema,
    joiContactFavoriteSchema
};


const Contact = mongoose.model('contact', contactSchema);


module.exports = {
    Contact,
    joiSchemes
}