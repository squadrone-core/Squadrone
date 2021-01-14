const mongoose = require('mongoose');
const bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;
const { Schema } = mongoose;

const aerialPhoto = new Schema({
    imageUrl: String,
    location: {type: Schema.Types.ObjectId, ref: "Location"}
});

const userSchema = new Schema({
  password: { type: String, required: true },
  email: {type: String, required: true, index: { unique: true }},
  country: String,
  age: Number,
  friends: [{type: Schema.Types.ObjectId, ref: "User"}],
  workRequests: [{type: Schema.Types.ObjectId, ref: "Request"}],
  experiencedPlaces:  [{type: Schema.Types.ObjectId, ref: "Location"}],
  favoriteCities:  [{type: Schema.Types.ObjectId, ref: "Location"}],
  favoriteLandscapes:  [{type: Schema.Types.ObjectId, ref: "Location"}],
  aerialPhotos: [aerialPhoto],
  clientName: String
});

userSchema.plugin(require('mongoose-role'), {
    roles: [ 'user', 'admin'],
    accessLevels: {
        user: ['user', 'admin'],
        admin: ['admin']
    }
});

userSchema.pre('save', async function(next) {
    //'this' refers to the current document about to be saved
    const user = this;
    //Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
    //your application becomes.
    const hash = await bcrypt.hash(this.password, 10);
    //Replace the plain text password with the hash and then store it
    this.password = hash;
    //Indicates we're done and moves on to the next middleware
    next();
});

userSchema.methods.isValidPassword = async function(password){
    const user = this;
    //Hashes the password sent by the user for login and checks if the hashed password stored in the
    //database matches the one sent. Returns true if it does else false.
    const compare = await bcrypt.compare(password, user.password);
    return compare;
};

module.exports = mongoose.model('User', userSchema);
