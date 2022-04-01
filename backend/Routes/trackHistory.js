const express = require('express');
const mongoose = require('mongoose');
const TrackHistory = require('../models/TrackHistory');
const authorization = require("../middleware/authorization");
const Album = require("../models/Album");
const Track = require("../models/Track");

const router = express.Router();

router.post('/', authorization, async (req, res, next) => {
    try {
        if (!req.body.track) {
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
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }
        return next(error);
    }
});

router.get('/', authorization, async (req, res, next) => {
    try {
        const histories = await TrackHistory.find({user: req.user._id}).sort({datetime: -1}).populate('track','_id title');

        if(!histories){

        }

        const tracks = histories.map(history => history.track._id);

        const albumsIdArray = [];
        let counterAlbum = 0;

        for (let id in tracks) {
            const artist = await Track.findOne({_id: {$in: tracks[counterAlbum]}}).populate('album', '_id');
            albumsIdArray.push(artist.album._id)
            counterAlbum++
        }

        const artistArray = [];
        let countArr = 0;

        for (let id in albumsIdArray) {
            const artist = await Album.findOne({_id:  albumsIdArray[countArr]})
                .populate('artist_id', 'title');
            artistArray.push(artist.artist_id.title)
            countArr++
        }

        let countArtist = 0;

        const result = histories.map( history => {
            const newObjHistory = {
                user: history.user,
                track: history.track,
                datetime: history.datetime,
                artist: artistArray[countArtist]
            }
            countArtist++
            return newObjHistory;
        });

        return res.send(result)

    } catch (error) {
        next(error)
    }
});

module.exports = router;
