const mongoose = require('mongoose');
const UserModel = mongoose.model('User');

module.exports =  (accessLevel)  => {
    return async function(req, res, next) {
        const user = await UserModel.findById(req.user._id);
        console.log(user);
        if (user.hasAccess(accessLevel)) {
            return next()
        }
        return res.json({
            success: false,
            error: 'Unauthorized'
        })
    }
};
