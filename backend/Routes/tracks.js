const express = require('express');
const mongoose = require('mongoose');
const Track = require('../models/Track');

const router = express.Router();

router.post('/', async(req, res, next) => {
   try{
       const track = new Track(req.body);

       await track.save()
        res.send(track);
   } catch(error){
       if(error instanceof mongoose.Error.ValidationError){
           return res.status(400).send(error);
       }
       return next(error)
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
        return next(error)
    }
});

module.exports = router;
