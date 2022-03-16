const express = require('express');
const mongoose = require('mongoose');
const Track = require('../models/Track');
const Album = require("../models/Album");
const Artist = require("../models/Artist");
const authorization = require("../middleware/authorization");
const permit = require("../middleware/permit");

const router = express.Router();

router.post('/', authorization, permit('admin'),async(req, res, next) => {
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

let tracks = [];

router.get('/', async(req, res, next) => {
    try{
        const query = {};

        if(req.query.album){
            query.album = {_id: req.query.album};
            tracks = await Track.find(query).populate('album', 'title artist_id');

            return res.send(tracks);
        }

        let tracksByArtistId = [];

        if(req.query.artist_id){
            const albums = await Album.find({artist_id: {_id: req.query.artist_id}});

            for(let album of albums){
                tracksByArtistId = await Track.find({album: {_id: album._id}});
            }
            return res.send(tracksByArtistId);
        }
    } catch(error){
        if(error instanceof mongoose.Error.ValidationError){
            return res.status(400).send(error);
        }
        return next(error);
    }
});

router.get('/byAlbum/:id', async(req,res,next) => {
    try{
        const albumInfo = await Album.find({_id: req.params.id}).populate('artist_id', '_id title');
        const artistInfo = await Artist.find({_id: albumInfo[0].artist_id._id});
        const tracksInfo = await Track.find({album: {_id: albumInfo[0]._id}}).populate('album', 'title');

        const album = {
            artist: artistInfo[0],
            album: albumInfo[0],
            tracks: tracksInfo,
        }

        return res.send(album);
    }catch (error){
        if(error instanceof mongoose.Error.ValidationError){
            return res.status(400).send(error);
        }
        return next(error);
    }
});

module.exports = router;
