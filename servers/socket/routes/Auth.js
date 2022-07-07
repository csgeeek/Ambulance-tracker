const Driver = require('../Models/Driver');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    try{
        const drivers = await Driver.find();
        res.send(drivers);
    }
    catch(e){
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
    const driverData = {
        name: req.body.name,
        password: req.body.password,
        ambNumber: req.body.ambNumber
    };
    try{
        // await driverData.save();
        await Driver.create(driverData);
        res.send({status: 'ok'});
    }
    catch(e){
        res.send({status: 'error', error: e});
    }
});


router.post('/login', async (req, res) => {

    const driver = await Driver.findOne({ name: req.body.name, password: req.body.password });

    if(driver){
        const token = jwt.sign({ 
            name: driver.name,
            ambNumber: driver.ambNumber,
            desc: req.body.desc
        }, 'secret');

        return res.json({ status: 'ok', driver: token });
    } else{
        return res.json({ status: 'err', driver: false });
    }
});

module.exports = router;