const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const {User, joiSchemes} = require('../../models/user');


const signup = async (req, res, next) => {
    try {
        const {error} = joiSchemes.joiSignupSchema.validate(req.body);

           if(error) {
               return res.status(400).json({message:"Error from Joi or another validation library."})
           }

    const {email, password} = req.body;

    const user = await User.findOne({email});
    if (user) {
        const error =  new Error(`Email in use`);
        error.status = 409;
        throw error;
    }

    const avatarURL = gravatar.url(email);
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({...req.body, password: hashPassword, avatarURL});

        res.status(201).json({
            status: "Created",
            code: 201,
            data: {
                user: newUser
                }
            });

        } catch (error) {
            next(error);
        }
}


module.exports = signup;
