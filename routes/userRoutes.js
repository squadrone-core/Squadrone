const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const User = mongoose.model('User');
const Flight = mongoose.model('Flight');
const Request = mongoose.model('Request');

module.exports = app => {
    app.post('/api/users/:id/addFriends', requireLogin, async (req, res) => {
        try {
            const user = await User.findOneAndUpdate({_id: req.user._id}, { '$push': { friends: req.params.id } });
            res.send(user);
        } catch (err) {
            res.status(400).send(err);
        }
    });
    app.post('/api/users/addCity', requireLogin, async (req, res) => {
        const { city } = req.body;
        try {
            const user =
                await User.findOneAndUpdate({_id: req.user._id}, { '$push': { favoriteCities: city } });
            res.send(user);
        } catch (err) {
            res.send(400,err);
        }
    });
    app.get('/api/users/favoriteCities', requireLogin, async (req, res) => {
        const user = await User.findOne({ _id: req.user._id }).populate({
            path: 'favoriteCities'
        });
        res.send(user);
    });
    app.post('/api/users/addLandscape', requireLogin, async (req, res) => {
        const { landscape } = req.body;
        try {
            const user =
                await User.findOneAndUpdate({_id: req.user._id}, { '$push': { favoriteLandscapes: landscape } });
            res.send(user);
        } catch (err) {
            res.send(400,err);
        }
    });
    app.get('/api/users/favoriteLandscapes', requireLogin, async (req, res) => {
        const user = await User.findOne({ _id: req.user._id }).populate({
            path: 'favoriteLandscapes'
        });
        res.send(user);
    });
    app.get('/api/users/friends', requireLogin, async (req, res) => {
        const user = await User.findOne({ _id: req.user._id }).populate({
            path: 'friends'
        });
        res.send(user);
    });
    app.get('/api/users/recentFlights', requireLogin, async (req, res) => {
        const flights = await Flight.find({ passengers: {$all: [req.user._id]}, status: 'FINISHED' }).sort([['_id', -1]]).limit(2).populate({
            path: 'location'
        });
        res.send(flights);
    });
    app.get('/api/users/recentWorkRequests/:limit', requireLogin, async (req, res) => {
        const requests = await Request.find({ from: req.user._id, type: 'work'}).sort([['_id', -1]]).limit(parseInt(req.params.limit)).populate({
            path: 'forLocation'
        });
        res.send(requests);
    });
    app.post('/api/users/friends', requireLogin, async (req, res) => {
        const {query} = req.body;
        const user = await User.findOne({ _id: req.user._id });
        if(user) {
            const friends = await User.find({_id: {$in: user.friends}, 'email': {'$regex': query}});
            res.send(friends);
        } else {
            res.status(500).send("no user found");
        }
    });
    app.get('/api/users/:id/clientName', requireLogin, async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.params.id });
            res.send(user.clientName);
        } catch(err){
            res.status(500).send(err);
        }
    });
    app.post('/api/users/search', requireLogin, async (req, res) => {
        const {query} = req.body;
        const users = await User.find({'email': {'$regex': query}});
        res.send(users);
    });
    app.post('/api/users', requireLogin, async (req, res) => {
        const { email } = req.body;
        const user = await User.findOne({email});
        res.send(user);
    });
};
