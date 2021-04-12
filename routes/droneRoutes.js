const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const puppeteer = require('puppeteer');
const jsonp = require('jsonp');
const Drone = mongoose.model('Drone');
const axios = require('axios');
const CircularJSON = require('circular-json');


module.exports = app => {
    app.post('/api/drones', requireLogin, async (req, res) => {
        const { SID, model, location } = req.body;
        const drone = new Drone({
            SID,
            model,
            location
        });

        try {
            await drone.save();
            res.send(drone)
        } catch (err) {
            res.send(400, err);
        }
    });

    app.post('/api/drones/:id/location', requireLogin, async (req, res) => {
        const { location } = req.body;
        const drone = Drone.findById(req.params.id);
        if(drone) {
            drone.location = location;
            try {
                await drone.save();
                res.send(drone);
            } catch (err) {
                res.send(400,err);
            }
        }
        res.send(500, "drone not found"); //todo: test this
    });

    app.post('/api/drones/:id/phone', requireLogin, async (req, res) => {
        const { phoneId } = req.body;
        const drone = Drone.findById(req.params.id);
        if(drone) {
            drone.phoneId = phoneId;
            try {
                await drone.save();
                res.send(drone);
            } catch (err) {
                res.send(400,err);
            }
        }
        res.send(500, "drone not found"); //todo: test this
    });

    app.get('/api/drones/:id', requireLogin, async (req, res) => {
        const drone = await Drone.findOne({
            _id: req.params.id
        });
        res.send(drone);
    });

    app.put('/api/drones/:id', requireLogin, async (req,res) => {
        const drone = await Drone.findOneAndUpdate( { _id: req.params.id }, req.body);
        res.send(drone);
    });
    app.get('/api/dronesNear', requireLogin, async (req, res) => {
        const {lat,lng} = req.query;
        const drones =
            await Drone.aggregate(
                [{
                    $geoNear: {
                        near: {type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)]},
                        distanceField: "dist.calculated",
                        maxDistance: 100000,
                        spherical: true
                    }
                }]
            );
        const ids = drones.map((drone)=>{return drone._id});
        const dronesAvailable = await Drone.find({_id: { $in: ids }, status: {$in: ['available','on_flight_available']}}).populate('pilot');
        res.send(dronesAvailable);
    });

    app.get('/api/flytLive', async (req, res) => {

            const browser = await puppeteer.launch({headless: false});
            const page = await browser.newPage();
            await page.goto('https://app.flyt.live/login');
            await page.waitForSelector('input[type="email"]');
            await page.type('input[type="email"]', 'mehrnaz348@gmail.com');
            await page.type('input[type="password"]', 'EamxGluK');
            await page.click('button[type="submit"]');
            const t = await page.waitForSelector('.container .menu-heading');
            // await browser.close();

    });
    app.post('/api/weatherDroneIn',async(req,res)=>{
        const {lat,lng} = req.body;
        const result = await axios.get(`https://weather.cit.api.here.com/weather/1.0/report.json?product=observation&latitude=${lat}&longitude=${lng}&oneobservation=true&app_id=3xUqVd9cMeWYXw2Hx6up&app_code=MNKM6bDv5zjwxFE_3hvJmw`)
        let json = CircularJSON.stringify(result.data);
        res.send(json);
    });
};
