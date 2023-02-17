const {User} = require('../models/user')


const authorization = async (req, res, next) => {
    const {authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(' ');

    if (bearer !== "Bearer") {
        const error =  new Error(`Not authorized`);
        error.status = 401;
        throw error;
    }
 
    try {
        const user = await User.findById(id);
        if (!user || !user.token) {
            const error =  new Error(`Not authorized`);
            error.status = 401;
            throw error;
        }
        req.user = user;
        next();

    } catch (error) {
        next();
    }

}

module.exports = authorization;
