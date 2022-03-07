const express = require('express');
const mongoose = require('mongoose');
const multer = require("multer");
const {nanoid} = require("nanoid");
const path = require("path");
const User = require('../models/User');
const config = require("../config");

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

router.post('/', upload.single('avatar'), async (req, res, next)=>{
   try{
       const user = new User({
           email: req.body.email,
           password: req.body.password,
           displayName: req.body.displayName,
           avatar: null
       });

       if(req.file){

           user.avatar = req.file.filename;
       }
       user.generateToken();

       await user.save();
       console.log(user)

       return res.send(user);
   } catch(error){
       if(error instanceof mongoose.Error.ValidationError){
           return res.status(400).send(error);
       }
       return next(error);
   }
});

router.post('/sessions', async (req, res, next) => {
    try{
        const user = await User.findOne({email: req.body.email});

        if(!user){
            return res.status(400).send({error: 'Wrong data'});
        }

        const isMatch = await user.checkPassword(req.body.password);

        if(!isMatch) {
            return res.status(400).send({error: 'Wrong data'});
        }

        user.generateToken();
        await user.save();

        return res.send({token: user.token});

    }catch (error){
        if(error instanceof mongoose.Error.ValidationError){
            return res.status(400).send(error);
        }
        return next(error);
   }
});



module.exports = router;