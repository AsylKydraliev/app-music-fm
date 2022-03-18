const express = require('express');
const mongoose = require('mongoose');
const TrackHistory = require('../models/TrackHistory');
const authorization = require("../middleware/authorization");
const Album = require("../models/Album");
const Track = require("../models/Track");

const router = express.Router();

router.post('/', authorization, async(req, res, next) => {
    try{
        if(!req.body.track){
            return res.status(400).send({error: 'Something went wrong'});
        }

        const trackHistory = new TrackHistory({
            user: req.user._id,
            track: req.body.track,
            datetime: new Date().toISOString()
          }
        );
        await trackHistory.save();
        res.send(trackHistory);
    } catch(error){
        if(error instanceof mongoose.Error.ValidationError){
            return res.status(400).send(error);
        }
        return next(error);
    }
});

router.get('/', authorization, async(req, res, next) => {
    try{
        const sort = {};
        sort.datetime = -1;
        let albumId;

        const trackHistories = await TrackHistory.find({user: req.user._id}).sort(sort)
            .populate('track', '_id title album');

        for(let album of trackHistories){
            albumId = album.track.album;

        }

        res.send(trackHistories);
    } catch(error){
        next(error)
    }
});



module.exports = router;
