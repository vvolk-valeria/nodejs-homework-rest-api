const {User} = require('./../../models/user');

const getCurrent = async (req, res, next) => {
    try {

        const {_id} = req.user;
        const user = await User.findById(_id);

        if (!user) {
            const error =  new Error(`Not authorized`);
            error.status = 401;
            throw error;
        }

        res.status(200).json({
            status: "OK",
            code: 200,
            data: {
                name: user.email,
                subscription: user.subscription,
              }
            })

    } catch (error) {
        next(error);
    }
}

module.exports = getCurrent;