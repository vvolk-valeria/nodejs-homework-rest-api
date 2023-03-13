const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const {User, joiSchemes} = require('../../models/user');
const { v4: uuidv4 } = require('uuid');
const sendEmail = require('../../helpers/sendEmail');

const register = async (req, res, next) => {
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
    const verificationToken = uuidv4();
console.log('verificationToken', verificationToken);
    const newUser = await User.create({...req.body, password: hashPassword, avatarURL, verificationToken});

    const mail = {
        to: email,
        subject: 'Website registration confirmation.',
        html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">click to confirm email</a>`,
    }
    await sendEmail(mail);

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


module.exports = register;
