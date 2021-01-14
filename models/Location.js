const mongoose = require('mongoose');
const { Schema } = mongoose;

const GFS = mongoose.model("GFS", new Schema({}, {strict: false}), "fs.files" );
const soundSchema = new Schema({
    tags: { type: [String], required: true },
    file: {type: Schema.Types.ObjectId, ref:'GFS'}
});
const pointSchema = new Schema({
    type: {type: String, default: 'Point'},
    coordinates: {type: [Number], index: '2dsphere'},
});


const locationSchema = new Schema({
  title: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
  drones: [{ type: Schema.Types.ObjectId, ref: 'Drone' }],
  imageUrl: String,
  type: String, //landscape - nature - work
  rate: {type: Number, default: 0},
  dronesCount: Number,
  maxRadius: Number,
  geometry: pointSchema,
  sounds: [soundSchema],
});
locationSchema.index({'title': 'text'});

mongoose.model('Location', locationSchema);
