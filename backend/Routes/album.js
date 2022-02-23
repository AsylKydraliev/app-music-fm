const express = require('express');
const {nanoid} = require("nanoid");
const multer = require('multer');
const Album = require("../models/Album");
const path = require("path");
const config = require('../config');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', async (req, res, next) => {
    try{
        if(req.query){
            const albumsByArtistId = await Album.find({artist_id: req.query.artist_id});

            return res.send(albumsByArtistId);
        }
        const albums = await Album.find();

        return res.send(albums);
    }catch (e){
        next(e);
    }
});

router.post('/', upload.single('image'), async (req, res, next) => {
    try{
        if(!req.body.title || !req.body.artist_id){
            res.status(400).send({error: 'Title and artist id is required'});
        }

        const albumObj = {
            title: req.body.title,
            artist_id: req.body.artist_id,
            year: req.body.info,
            image: null
        };

        if(req.file){
            albumObj.image = req.file.filename;
        }

        const album = new Album(albumObj);
        await album.save();

        return res.send(album);
    }catch (e){
        next(e);
    }
});

router.get('/:_id', async (req, res, next) => {
    try{
        const album = await Album.findOne({_id: req.params._id});

        if(!album){
            res.status(400).send({error: 'This album does not exist'})
        }

        return res.send(album);
    }catch (e){
        next(e);
    }
});

module.exports = router;