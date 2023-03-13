const {User, joiSchemes} = require('../../models/user');
const sendEmail = require('../../helpers/sendEmail');

const resendVerifyEmail = async (req, res, next) => {
    try {
        const {error} = joiSchemes.joiVerifyEmailSchema.validate(req.body);

           if(error) {
               return res.status(400).json({message: "Error from Joi or another validation library. Missing required field email"})
           }
        
           const {email} = req.body;
           const user = await User.findOne({email});
       
           if (!user) {
               const error =  new Error(`Not found`);
               error.status = 404;
               throw error;
           }
           if(user.verify){
            return res.status(400).json({message: "Verification has already been passed"})
           }

        const mail = {
            to: email,
            subject: 'Website registration confirmation.',
            html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}" target="_blank">click to confirm email</a>`,
        }
        await sendEmail(mail);

        res.status(200).json({
            status: "Ok",
            code: 200,
            data: {
                message: "Verification email sent"
                }
            });

    } catch (error) {
        next(error);
    }
};

module.exports = resendVerifyEmail;