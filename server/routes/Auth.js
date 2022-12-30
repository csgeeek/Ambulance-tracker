const Driver = require('../Models/Driver');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.send(drivers);
    }
    catch (e) {
        res.send(e);
    }
});

router.get('/name', async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secret')
        const name = decoded.name

        const driver = await Driver.findOne({ name: name })

        return res.json({ status: 'ok', name: driver.name, ambNumber: decoded.ambNumber, desc: decoded.desc })
    } catch (error) {
        // console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }
});


router.post('/signup', async (req, res) => {

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const driverData = {
        name: req.body.name,
        password: hashedPassword,
        ambNumber: req.body.ambNumber
    };
    try {
        //checking username or ambulance exists in database already and sending response
        const usernameexists= await Driver.findOne({ name: driverData.name });
        const ambulanceexists= await Driver.findOne({ ambNumber:driverData.ambNumber});
    
        if(usernameexists)
        {
            res.send({check: '1'});
            return;
        }
        if(ambulanceexists)
        {
            res.send({check: '2'});
            return;
        }
        //await driverData.save();
        await Driver.create(driverData);
        res.send({ status: 'ok' });
    }
    catch (e) {
        res.send({ status: 'error', error: e });
    }
});


router.post('/login', async (req, res) => {

    const driver = await Driver.findOne({ name: req.body.name });
    if (driver == null) {
        return res.status(400).json({ status: 'err', driver: false, error: 'Cannot find driver' });
    }
    const isMatch = await bcrypt.compare(req.body.password, driver.password);
    if (isMatch) {
        const token = jwt.sign({
            name: driver.name,
            ambNumber: driver.ambNumber,
            desc: req.body.desc
        }, 'secret', { expiresIn: '24h' });

        return res.json({ status: 'ok', driver: token });
    } else {
        return res.status(404).json({ status: 'err', driver: false });
    }
});

module.exports = router;