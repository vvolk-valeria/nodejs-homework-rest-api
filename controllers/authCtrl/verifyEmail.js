const {User} = require('../../models/user');

const verifyEmail = async (req, res, next) => {
  try {
    const {verificationToken} = req.params;

    const user = await User.findOne({verificationToken});

    if (!user) {
      return res.status(404).json({status:'User not found'});
    }

    await User.findByIdAndUpdate(user._id, {verificationToken: null, verify:true});
   
    res.status(200).json({
        status: "Ok",
        code: 200,
        data: {
            message: 'Verification successful'
            }
        });

  } catch (error) {
    next(error);
  }

};


module.exports = verifyEmail;