const express = require('express');
const mongoose = require('mongoose');
const TrackHistory = require('../models/TrackHistory');

const router = express.Router();

router.post('/', async(req, res, next) => {
    try{
        const trackHistory = new TrackHistory({
            user: req.body.user,
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
        return next(error)
    }
});

module.exports = router;
