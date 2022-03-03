const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res, next)=>{
   try{
       if(!req.body.username || !req.body.password){
           return res.status(400).send({error: 'Something went wrong'})
       }

       const user = new User({
           username: req.body.username,
           password: req.body.password
       });

       await user.save();
       return res.send(user);
   } catch(error){
       if(error instanceof mongoose.Error.ValidationError){
           return res.status(400).send(error);
       }
       return next(error);
   }
});

module.exports = router;