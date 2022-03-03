const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require("bcrypt");

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

router.post('/sessions', async (req, res, next) => {
    try{
        const user = await User.findOne({username: req.body.username});

        if(!user){
            return res.status(400).send({error: 'Wrong data'});
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if(!isMatch) {
            return res.status(400).send({error: 'Wrong data'});
        }

        return res.send({message: 'Data is correct'});
    }catch (error){
        if(error instanceof mongoose.Error.ValidationError){
            return res.status(400).send(error);
        }
        return next(error);
   }

});

module.exports = router;