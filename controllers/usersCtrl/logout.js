const {User} = require('./../../models/user');

const logout = async (req, res, next) => {
    try {
        const {_id} = req.user; 
        const user = await User.findByIdAndUpdate(_id, {token: ''});

        if (!user) {
            const error =  new Error(`Not authorized`);
            error.status = 401;
            throw error;
        } 

        res.status(204).json({
        status: "No Content",
        code: 204,
        })

    } catch (error) {
        next(error);
    }


}

module.exports = logout;
