const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/prod');
const router = require('./routes/voiceRouter');

require('./models/User');
require('./models/Location');
require('./models/Drone');
require('./models/Flight');
require('./models/Request');

mongoose.Promise = global.Promise;

const mongoURI = keys.mongoURI;
const options = {
   keepAlive: true,
   keepAliveInitialDelay: 300000,
   useMongoClient: true,
   useNewUrlParser: true,
};

try {
    mongoose.connect(mongoURI, options).then(response => {
        console.log("response")
        console.log(response)
    });
}catch (err) {
    console.log("err!!!")
    console.log(err)
}

const app = express();

require('./middlewares/passport');
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());


app.all('*', function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Credentials', true);
    res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, x-authorization');
    if ('OPTIONS' === req.method) {
        return res.sendStatus(200);
    }
    next();
});
require('./routes/authRoutes')(app);
require('./routes/locationRoutes')(app);
require('./routes/droneRoutes')(app);
require('./routes/requestRoutes')(app);
require('./routes/flightRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/trackRoutes')(app);
app.use(router);

app.use(express.static('client/build'));

const path = require('path');
app.get('*', (req, res) => {
res.sendFile(path.resolve('client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});
