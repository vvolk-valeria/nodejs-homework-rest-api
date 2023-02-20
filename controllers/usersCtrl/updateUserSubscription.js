const {User, joiSchemes} = require('../../models/user');

const updateUserSubscription = async (req, res, next) => {
    try {
        const {error} = joiSchemes.joiSubscriptionSchema.validate(req.body);

            if(error) {
                return res.status(400).json({message:"missing field favorite"})
            }

        const {_id} = req.user;
        const {subscription} = req.body;
        const user = await User.findByIdAndUpdate(_id, {subscription: subscription}, {new:true});
    if (!user) {
        const error =  new Error(`User not found`);
        error.status = 404;
        throw error;
    } 
    res.json({
        status: "success",
        code: 200,
        data: {
            result: user
            }
        });
    } catch (error) {
        next(error);
    }
  }

module.exports = updateUserSubscription;