const mongoose = require('mongoose');
const Promise = require('bluebird');
Promise.promisifyAll(mongoose);
const { Schema } = mongoose;
const optionsSchema = new Schema({
    voice: {type: Boolean, default: false},
    pathType: {type: String, default: 'automate'}, //automate - manual - setPoint
    usageType: {type: String, default: 'all'} //friends - alone - all
});
const pointSchema = new Schema({
    type: {type: String, default: 'Point'},
    coordinates: {type: [Number], index: '2dsphere'},
});
const flightSchema = new Schema({
    drone: {type: Schema.Types.ObjectId, ref:'Drone'},
    passengers: [{type: Schema.Types.ObjectId, ref:'User'}],
    status: String,
    hasControl: {type: Schema.Types.ObjectId, ref:'User'},
    passEnabled: {type: Boolean, default: false},
    location: {type: Schema.Types.ObjectId, ref: 'Location'},
    createdAt: { type: Date, default: Date.now },
    options: optionsSchema,
    path: [pointSchema]
});

mongoose.model('Flight', flightSchema);
