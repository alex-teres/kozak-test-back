const express = require('express');
const router = express.Router();
const Workers = require('../models/workers');
const passport = require('passport');

router.all('/', passport.authenticate('jwt', { session: false }));

router.get('/', function (req, res, next) {
    Workers.find(req.query, (err, items) => {
        err ? res.status(500).json({ error: err, message: 'Server error' }) : res.status(items && items.length ? 200 : 404).json(items);
    });
});

router.post('/', async function (req, res, next) {
    const newWorker = new Workers(req.body);
    try {
        await newWorker.validate();
    } catch (err) {
        return res.status(403).json(err);
    }
    newWorker.save((err, item) => {
        err ? res.status(500).json({ error: err, message: 'Server error' }) : res.status(200).json({ message: 'Created', data: item });
    });
});

router.put('/:id', async function (req, res, next) {
    await Workers.updateOne({ _id: req.params.id }, req.body, { runValidators: true }, (err, item) => {
        err ? res.status(403).json(err) : res.status(200).json({ message: 'Updated', data: req.body })
    });
});

router.delete('/:id', async function (req, res, next) {
    await Workers.deleteOne({ _id: req.params.id }, (err, item) => {
        err ? res.status(403).json(err) : res.status(200).json({ message: 'Deleted', data: item })
    });
});

module.exports = router;
