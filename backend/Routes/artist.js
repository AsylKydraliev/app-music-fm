const express = require('express');
const {nanoid} = require("nanoid");
const multer = require('multer');
const Artist = require("../models/Artist");
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
        const artists = await Artist.find();
        return res.send(artists);
    }catch (e){
        next(e);
    }
});

router.delete('/:id', async (req, res, next) => {
    try{
        const artists = await Artist.deleteOne({_id: req.params.id});
        return res.send(artists);
    }catch (e){
        next(e);
    }
});

router.post('/', upload.single('photo'), async (req, res, next) => {
    try{
        if(!req.body.title){
            res.status(400).send({error: 'Title is required'});
        }

        const artistObj = {
            title: req.body.title,
            photo: null,
            info: req.body.info,
        };

        if(req.file){
            artistObj.photo = req.file.filename;
        }

        const artist = new Artist(artistObj);
        await artist.save();

        return res.send(artist);
    }catch (e){
        next(e);
    }
});

module.exports = router;