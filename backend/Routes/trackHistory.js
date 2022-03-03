const express = require('express');
const mongoose = require('mongoose');
const TrackHistory = require('../models/TrackHistory');
const authorization = require("../middleware/authorization");

const router = express.Router();

router.post('/', authorization, async(req, res, next) => {
    try{
        if(!req.body.track){
            return res.status(400).send({error: 'Something went wrong'})
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
        return next(error)
    }
});

module.exports = router;
