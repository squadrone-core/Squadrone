const passport = require('passport');
const mongoose = require('mongoose');
const localStrategy = require('passport-local').Strategy;
const UserModel = mongoose.model('User');
const JWTstrategy = require('passport-jwt').Strategy;
//We use this to extract the JWT sent by the user
const ExtractJWT = require('passport-jwt').ExtractJwt;
//Create a passport middleware to handle user registration
passport.use('signup', new localStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        //Save the information provided by the user to the the database
        if(email && password) {
            const user = await UserModel.create({
                email,
                password,
                country: req.body.country,
                age: req.body.age,
                role: 'user'
            });
            return done(null, user);
        } else {
            throw Error("email and pass!!");
        }
        //Send the user information to the next middleware
    } catch (error) {
        done(error);
    }
}));

//Create a passport middleware to handle User login
passport.use('login', new localStrategy({
    usernameField : 'email',
    passwordField : 'password'
}, async (email, password, done) => {
    try {
        //Find the user associated with the email provided by the user
        const user = await UserModel.findOne({ email });
        if( !user ){
            //If the user isn't found in the database, return a message
            return done(null, false, { message : 'User not found'});
        }
        //Validate password and make sure it matches with the corresponding hash stored in the database
        //If the passwords match, it returns a value of true.
        const validate = await user.isValidPassword(password);
        if( !validate ){
            return done(null, false, { message : 'Wrong Password'});
        }
        //Send the user information to the next middleware
        return done(null, user, { message : 'Logged in Successfully'});
    } catch (error) {
        return done(error);
    }
}));
//This verifies that the token sent by the user is valid
passport.use(new JWTstrategy({
    //secret we used to sign our JWT
    secretOrKey : 'top_secret',
    //we expect the user to send the token as a query paramater with the name 'secret_token'
    jwtFromRequest : ExtractJWT.fromHeader('authorization')
}, async (token, done) => {
    try {
        //Pass the user details to the next middleware
        return done(null, token.user);
    } catch (error) {
        done(error);
    }
}));
