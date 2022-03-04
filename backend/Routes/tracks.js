const express = require('express');
const mongoose = require('mongoose');
const Track = require('../models/Track');
const Album = require("../models/Album");

const router = express.Router();

router.post('/', async(req, res, next) => {
   try{
       if(!req.body.title || !req.body.album || !req.body.duration){
           return res.status(400).send({error: 'Something went wrong'});
       }

       const track = new Track({
           title: req.body.title,
           album: req.body.album,
           duration: req.body.duration,
       });

       await track.save();
        res.send(track);
   } catch(error){
       if(error instanceof mongoose.Error.ValidationError){
           return res.status(400).send(error);
       }
       return next(error);
   }
});

router.get('/', async(req, res, next) => {
    try{
        const query = {};

        if(req.query.album){
            query.album = {_id: req.query.album};
        }

        const tracks = await Track.find(query).populate('album', 'title');

        return res.send(tracks);
    } catch(error){
        if(error instanceof mongoose.Error.ValidationError){
            return res.status(400).send(error);
        }
        return next(error);
    }
});

router.get('/', async(req, res, next) => {
    try{
        const query = {};

        if(req.query.artist_id){
            query.artist_id = {_id: req.query.artist_id};
        }

        const tracks = await Album.find(query).populate('artist_id', 'title');

        return res.send(tracks);
    } catch(error){
        if(error instanceof mongoose.Error.ValidationError){
            return res.status(400).send(error);
        }
        return next(error);
    }
});

module.exports = router;
