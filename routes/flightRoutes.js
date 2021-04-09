const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const hasAccess = require('../middlewares/access');

const Flight = mongoose.model('Flight');
const Drone = mongoose.model('Drone');

module.exports = app => {
    app.post('/api/flights', requireLogin, async (req, res) => {
        const { drone, options, location, droneStatus } = req.body;
        let passengers = [req.user._id];
        // if(options.usageType === "friends") {
        //     passengers.concat(req.body.passengers); //todo: doesn't work
        // }
        const flight = new Flight({
            drone,
            passengers,
            status: 'INITIATED',
            location,
            options,
            hasControl: passengers[0]
        });
        if(options.pathType === "setPoint") {
            flight.path = req.body.path;
        }
        try {
            await flight.save();
            await Drone.findOneAndUpdate({_id: drone}, {status: droneStatus, pilot: passengers[0] });
            res.send(flight)
        } catch (err) {
            res.send(400, err);
        }
    });
    app.post('/api/flights/:id/change/control', requireLogin, async (req, res) => {
        try {
            const flight = await Flight.findOneAndUpdate({_id: req.params.id}, {hasControl: req.user._id}, {new: true});
            await Drone.findOneAndUpdate({_id: flight.drone}, {pilot: req.user._id}, {new: true});
            res.send(flight)
        } catch (err) {
            res.send(400, err);
        }
    });
    app.post('/api/flights/:id/pass/control', requireLogin, async (req, res) => {
        const {passEnabled} = req.body;
        try {
            const flight = await Flight.findOneAndUpdate({_id: req.params.id}, {passEnabled: passEnabled}, {new: true});
            res.send(flight)
        } catch (err) {
            res.send(400, err);
        }
    });
    app.post('/api/flights/:id/passengers', requireLogin, async (req, res) => {
        const { passengers } = req.body;
        const flight = Flight.findById(req.params.id);
        if(flight) {
            passengers.forEach(passenger => {
                flight.passengers.push(passenger);
            });
            try {
                await flight.save();
                res.send(flight);
            } catch (err) {
                res.send(400,err);
            }
        }
        res.send(500, "flight not found"); //todo: test this
    });

    app.get('/api/flights/:id', requireLogin, async (req, res) => {
        const flight = await Flight.findOne({
            _id: req.params.id
        }).populate('location').populate({path: 'drone', populate: {path: 'pilot', model:'User'}});
        res.send(flight);
    });

    app.get('/api/flights', requireLogin, async (req, res) => { //todo: pagination
        const flights = await Flight.find({});
        res.send(flights);
    });
    app.post('/api/flights/search', requireLogin, async (req, res) => {
        let query = {};
        if(req.body.droneId) {
            query['drone'] = req.body.droneId;
        } else if(req.body.status) {
            query['status'] = req.body.status;
        } else if( req.body.passengers ) {
            query['passengers'] = { '$all': req.body.passengers }
        }
        const flights = await Flight.find(query).populate('drone');
        res.send(flights);
    });
    app.put('/api/flights/:id',requireLogin, hasAccess('admin'), async (req,res)=>{
        const id = req.params.id;
        if(id.match(/^[0-9a-fA-F]{24}$/)) {
            const flight = await Flight.findOneAndUpdate({_id: id}, req.body);
            res.send(flight);
        } else {
            res.status(400).send({message: "not a valid id"});
        }
    });
    app.post('/api/flights/attend',requireLogin, async (req,res)=>{

        const flight = await Flight.findOneAndUpdate({ drone: req.body.droneId }, { '$push': { passengers: req.user._id } });
        res.send(flight);

    });
};
