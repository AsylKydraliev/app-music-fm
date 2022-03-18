const express = require('express');
const mongoose = require('mongoose');
const TrackHistory = require('../models/TrackHistory');
const authorization = require("../middleware/authorization");
const Album = require("../models/Album");

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
        let albums = [];
        const sort = {};
        sort.datetime = -1;

        const trackHistories = await TrackHistory.find({user: req.user._id}).sort(sort)
            .populate('track', '_id title album');

        // for (let item of trackHistories){
        //     albums = await Album.find({album: item.track.album}).populate('artist_id', 'title');
        // }
        //
        // for (let album of trackHistories){
        //     for(let item of albums){
        //         if(album.track.album === item._id){
        //
        //         }
        //     }
        // }

        res.send(trackHistories);
    } catch(error){
        next(error)
    }
});



module.exports = router;
