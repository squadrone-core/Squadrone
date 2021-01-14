const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Request = mongoose.model('Request');
const User = mongoose.model('User');
const Flight = mongoose.model('Flight');

module.exports = app => {
    app.post('/api/requests', requireLogin, async (req, res) => {
        const { to, type } = req.body;
        let from = req.user._id;
        if(req.body.from) {
            from = req.body.from;
        }
        const request = new Request({
            from,
            to,
            type,
        });
        if(req.body.forId) {
            request.forLocation = req.body.forId;
        }
        if(req.body.flightId) {
            request.forFlight = req.body.flightId;
        }
        try {
            await request.save();
            res.send(request)
        } catch (err) {
            res.send(400, err);
        }
    });

    app.post('/api/requests/:id/status', requireLogin, async (req, res) => {
        const { status } = req.body;
        const id = req.params.id;
        if(id.match(/^[0-9a-fA-F]{24}$/)) {
            const request = await Request.findOneAndUpdate({_id: id}, {status: status});
            if(status === "accepted" && request.type === "friend") {
                console.log(request);
                await User.findOneAndUpdate({_id: request.from}, { '$push': { friends: request.to } }); //todo: fix all first objects of this query
            }
            if(status === "accepted" && request.type === "flight") {
                await Flight.findOneAndUpdate({_id: request.forFlight}, { '$push': { passengers: request.to } });
            }
            res.send(request);
        } else {
            res.status(400).send({message: "not a valid id"});
        }
    });

    app.get('/api/requests/:id', requireLogin, async (req, res) => {
        const request = await Request.findOne({
            _id: req.params.id
        });
        res.send(request);
    });

    app.get('/api/requests/from/:userId', requireLogin, async (req, res) => {
        const requests = await Request.find({
            from: req.params.userId
        });
        res.send(requests);
    });

    app.get('/api/currentUser/requests', requireLogin, async (req, res) => {
        const requests = await Request.find({
            to: req.user._id,
            status: 'pending'
        }).populate('from').populate('forLocation').populate({path: 'forFlight',populate:{path: 'drone', model: 'Drone', populate:{path:'pilot',model:'User'}}});
        res.send(requests);
    });

};
