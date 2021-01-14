const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');


const Location = mongoose.model('Location');

module.exports = app => {
  app.get('/api/locations/withDrones', async (req, res) => {
    const locations = await Location.find({ dronesCount: {'$gt': 0} }).populate({path: 'drones', populate: {path: 'pilot', model:'User'}});
    res.send(locations);
  });

  app.get('/api/locations/:id', requireLogin, async (req, res) => {
      const location = await Location.findOne({
          _id: req.params.id
      }).populate('drone');
    res.send(location);
  });


  app.post('/api/locations', requireLogin, async (req, res) => {
    const { title, description, imageUrl, type, maxRadius, geometry } = req.body;

    const location = new Location({
        title,
        description,
        imageUrl,
        type,
        maxRadius,
        geometry
    });

    try {
      await location.save();
      res.send(location);
    } catch (err) {
      res.send(400, err);
    }
  });

  app.post('/api/locations/:id/addDrone', requireLogin, async (req, res) => {
    const { droneId } = req.body;
    try {
        const location = await Location.findOneAndUpdate({_id: req.params.id}, { '$push': { drones: droneId }, '$inc' : {dronesCount: 1} });
        res.send(location);
    } catch (err) {
        res.send(400, err);
    }
  });

    app.post('/api/locations/:id/sounds', requireLogin, async (req, res) => {
        const { soundDetail } = req.body;
        try {
            const location = await Location.findOneAndUpdate({_id: req.params.id}, { '$push': { sounds: soundDetail } });
            res.send(location);
        } catch (err) {
            res.send(400, err);
        }
    });

  app.post('/api/locations/:id/rate', requireLogin, async (req, res) => {
    const { rate } = req.body;
    try {
        const location = await Location.findOne({_id: req.params.id});
        location.rate = (location.rate + rate) / 2;
        location.save();
        res.send(location);
    } catch (err) {
        res.send(400, err);
    }
  });

  app.get('/api/locations', requireLogin, async (req, res) => {
        const {lat,lng} = req.query;
        const locations =
            await Location.aggregate(
                [{
                    $geoNear: {
                        near: {type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)]},
                        distanceField: "dist.calculated",
                        maxDistance: 5000,
                        spherical: true
                    }
                }]
            );
        res.send(locations); //todo: add dronesCount +
  });

  app.post('/api/locations/search', async (req, res) => {
        const {query} = req.body;
        let locations = await Location.find({$text: {$search: query}, dronesCount: {'$gt': 0}}).limit(10);
        if(locations.length === 0) {
            locations = await Location.find({'title': {'$regex': query}});
        }
        res.send(locations);
  });
};
