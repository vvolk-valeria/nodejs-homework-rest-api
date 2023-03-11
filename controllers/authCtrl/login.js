const bcrypt = require('bcrypt');
const {User, joiSchemes} = require('../../models/user');

const jwt = require('jsonwebtoken');
require("dotenv").config();

const {SECRET_KEY} = process.env;

const login = async (req, res, next) => {
    try {
        const {error} = joiSchemes.joiLoginSchema.validate(req.body);

           if(error) {
               return res.status(400).json({message:"Error from Joi or another validation library."})
           }

    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (!user) {
        const error =  new Error(`Email or password is wrong`);
        error.status = 401;
        throw error;
    }

    const passwordCompare = await bcrypt.compare(password, user.password); 

    if (!passwordCompare) {
        const error =  new Error(`Email or password is wrong`);
        error.status = 409;
        throw error;
    }
    
    const payload = {
        id: user._id,
    }
  
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
    await User.findByIdAndUpdate(user._id, {token});
  
    res.status(200).json({
    status: "OK",
    code: 200,
    data: {
        token : token,
        user: {
            name: user.name,
            subscription: user.subscription,
        }
      }
    })

        
    } catch (error) {
        next(error);
    }
}

module.exports = login;
