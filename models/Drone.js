const mongoose = require('mongoose');
const Promise = require('bluebird');
Promise.promisifyAll(mongoose);
const { Schema } = mongoose;
const pointSchema = new Schema({
    type: {type: String, default: 'Point'},
    coordinates: {type: [Number], index: '2dsphere'},
});
const droneSchema = new Schema({
    SID: String,
    model: String,
    location: pointSchema,
    batteryStatus: String,
    phoneId: String,
    status: {type: String, lowercase: true, default: "available" }, //available, on_flight_busy, on_flight_available
    embedUrl: String,
    pilot: {type: Schema.Types.ObjectId, ref:'User'},
    VehicleID: String
});

mongoose.model('Drone', droneSchema);
