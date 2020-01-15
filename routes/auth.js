const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');

router.post('/login', (req, res)=>{
    User.findOne({username: req.body.username}, (err, user)=> {
        if (err) throw err;
        if (user) {
            if (user.password !== req.body.password) {
                res.status(401).json({message: 'Wrong password'});
            } else {
                res.json({token: `Bearer ${jwt.sign({_id: user._id}, config.jwtSecretKey)}`});
            }
        } else {
            res.status(404).json({message: 'User not found'});
        }
    });
});


router.post('/signup', async function (req, res, next) {
    const newUser = new User(req.body);
    try {
        await newUser.validate();
    } catch (err) {
        return res.status(403).json(err);
    }
    newUser.save((err, item) => {
        err ? res.status(500).json({ error: err, message: 'Server error' }) : res.status(200).json({ message: 'Registered', data: item });
    });
});

module.exports = router;