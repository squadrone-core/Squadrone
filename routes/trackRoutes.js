const multer = require('multer');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const { Readable } = require('stream');
mongoose.Promise = global.Promise;
const mongoURI = "mongodb://localhost:27017/drone_dev?authSource=admin"; //connecting to ciphertrick
const options = {
    user:"adminMehrnazi",
    pass:"Mehrnaz!||isFor74%maryam&*moM@AaO#",
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    useNewUrlParser: true
};
const conn = mongoose.createConnection(mongoURI,options);

module.exports = app => {
    app.get('/api/tracks/:trackID', (req, res) => {
        try {
            var trackID = new ObjectID(req.params.trackID);
        } catch (err) {
            return res.status(400).json({message: "Invalid trackID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters"});
        }
        res.set('content-type', 'audio/mp3');
        res.set('accept-ranges', 'bytes');

        let bucket = new mongoose.mongo.GridFSBucket(conn.db);

        let downloadStream = bucket.openDownloadStream(trackID);

        downloadStream.on('data', (chunk) => {
            res.write(chunk);
        });

        downloadStream.on('error', () => {
            res.sendStatus(404);
        });

        downloadStream.on('end', () => {
            res.end();
        });
    });

    app.post('/api/tracks', (req, res) => {
        const storage = multer.memoryStorage();
        const upload = multer({storage: storage, limits: {fields: 1, fileSize: 6000000, files: 1, parts: 2}});
        upload.single('track')(req, res, (err) => {
            if (err) {
                return res.status(400).json({message: "Upload Request Validation Failed"});
            } else if (!req.body.name) {
                return res.status(400).json({message: "No track name in request body"});
            }

            let trackName = req.body.name;

            // Covert buffer to Readable Stream
            const readableTrackStream = new Readable();
            readableTrackStream.push(req.file.buffer);
            readableTrackStream.push(null);
            let bucket = new mongoose.mongo.GridFSBucket(conn.db);

            let uploadStream = bucket.openUploadStream(trackName);
            let id = uploadStream.id;
            readableTrackStream.pipe(uploadStream);

            uploadStream.on('error', () => {
                return res.status(500).json({message: "Error uploading file"});
            });

            uploadStream.on('finish', () => {
                return res.status(201).json({message: "File uploaded successfully, stored under Mongo ObjectID: " + id});
            });
        });
    });
};

