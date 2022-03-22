const express = require('express');
const {nanoid} = require("nanoid");
const multer = require('multer');
const Album = require("../models/Album");
const path = require("path");
const config = require('../config');
const authorization = require("../middleware/authorization");
const permit = require("../middleware/permit");

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
       const query = {};
       if (req.query.artist_id){
           query.artist_id = {_id: req.query.artist_id};
       }
       const albums = await Album.find(query).populate('artist_id', 'title');

       return res.send(albums);
    }catch (e){
        next(e);
    }
});

router.post('/', authorization, permit('user', 'admin'), upload.single('image'), async (req, res, next) => {
    try{
        if(!req.body.title || !req.body.artist_id){
            res.status(400).send({error: 'Title and artist id is required'});
        }

        const album = new Album({
            title: req.body.title,
            artist_id: req.body.artist_id,
            year: req.body.year,
            image: null,
        });

        if(req.user.role === 'admin'){
            album.isPublished = true;
        }

        if(req.file){
            album.image = req.file.filename;
        }

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

router.post('/:id/publish', authorization, permit('admin'), async (req, res, next) => {
    try{
        await Album.updateOne({_id: req.params.id}, {isPublished: req.body.isPublished});

        return res.send('Published!');
    }catch (e){
        next(e);
    }
});

router.delete('/:id', authorization, permit('admin'), async (req, res, next) => {
    try{
        const album = await Album.findByIdAndRemove({_id: req.params.id});

        return res.send(album);
    }catch (e){
        next(e);
    }
});

module.exports = router;