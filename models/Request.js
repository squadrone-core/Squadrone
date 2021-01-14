const mongoose = require('mongoose');
const Promise = require('bluebird');
Promise.promisifyAll(mongoose);
const { Schema } = mongoose;

const RequestSchema = new Schema({
    from: {type: Schema.Types.ObjectId, ref:"User"},
    to: {type: Schema.Types.ObjectId, ref:"User"},
    type: String, //flight - friend - work
    forLocation: {type: Schema.Types.ObjectId, ref: "Location" },
    status: {type: String, default:"pending"},
    forFlight: {type: Schema.Types.ObjectId, ref: "Flight" },
});

mongoose.model('Request', RequestSchema);
