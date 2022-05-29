const express = require('express');
const router = express.Router();
const Coordinates = require('../models/Coordinates');
// import Coordinates from '../models/Coordinates';

router.get('/', async (req, res) => {
    // console.log(`Coords: ${coord.lat}`);
    // res.send(coord);
    try{
        const coordinates = await Coordinates.find();
        res.json(coordinates);
        // console.log(res);
    }
    catch(err){
        res.json({ message: err });
    }
});
router.post('/', async (req, res) => {

    const coordinates = new Coordinates({
        uniqId: req.body.uniqId,
        latitude: req.body.lat,
        longitude: req.body.lon
    });
    // console.log(coordinates.uniqId);
    if(req.body.uniqId !== ''){
        try{
    
            // let query = {'uniqId': req.body.uniqId};
            // // req.newData.latitude = req.coordinates.latitude;
            // await Coordinates.findOneAndUpdate(query, req.body, { upsert: true}, function(err, doc) {
            //     if (err) return res.send('error couldnt findoneupdate');
            //     return res.send('Succesfully saved.');
            // });
    
            await Coordinates.updateOne({
                uniqId: req.body.uniqId
            }, {  uniqId: req.body.uniqId, latitude: req.body.lat, longitude: req.body.lon }, { upsert: true });
            // await coordinates.save();
            // res.json(coordinates);
            // await Coordinates.find({uniqId: coordinates.uniqId}, (err, results) => {
            //     if(err){
            //         console.log(err);
            //         red.json({message: err});
            //     }
            //     if(!results.length){
            //         Coordinates.save();
            //         console.log('succesfully saved');
            //     }
            //     else{
            //         const condition = { uniqId: req.body.uniqId };
            //         Coordinates.updateOne(condition, req.body)
            //         .then(doc => {
            //             if(!doc){
            //                 console.log('doc not found');
            //                 res.json({message: "error"});
            //             }
            //             else res.json(doc)
            //         })
    
            //     }
            // });
            // const upCoord = await Coordinates.findOneAndUpdate({uniqId: coordinates.uniqId}, {uniqId: coordinates.uniqId, latitude: req.body.lat, longitude: req.body.lon}, {upsert: true, new: true});
            // console.log(req.body.);
            // res.json(upCoord);
        }
        catch(err){
            // await coordinates.save();
            // console.log('error2');
            res.json({message: "error"});
        }
    }else{
        res.json({message: "empty string"});
    }
    // console.log(`body = ${coordinates}`);

    // coord = req.body;
    // res.json({
    //     status: "successful"
    // });
});

module.exports = router;