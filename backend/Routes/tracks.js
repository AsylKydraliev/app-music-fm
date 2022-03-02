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

module.exports = router;
