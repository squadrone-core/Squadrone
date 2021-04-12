const passport = require('passport');
const jwt = require('jsonwebtoken');
module.exports = app => {
    app.post('/auth/login', async (req, res, next) => {
        passport.authenticate('login', async (err, user, info) => {     try {
            if(err || !user){
                const error = new Error(info.message);
                // console.log(info);
                return res.status(404).send({ success : false, message : info.message });
                // return res.send({ success : false, message : info.message });
            }
            req.login(user, { session : false }, async (error) => {
                if( error ) res.status(404).send({ success : false, message : error.message });
                //We don't want to store the sensitive information such as the
                //user password in the token so we pick only the email and id
                const body = { _id : user._id, email : user.email, role: user.role };
                //Sign the JWT token and populate the payload with the user email and id
                const token = jwt.sign({ user : body },'top_secret');
                //Send back the token to the user
                return res.json({ token, user: body });
            });     } catch (error) {
            return res.status(404).send({ success : false, message : error.message });
        }
        })(req, res, next);
    });

    app.post('/auth/signup', passport.authenticate('signup', { session : false }) , async (req, res, next) => {
        res.json({
            message : 'Signup successful',
            user : req.user
        });
    });
    app.get('/auth/logout', (req, res) => {
        req.logout(); //todo: not sure about this
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};
