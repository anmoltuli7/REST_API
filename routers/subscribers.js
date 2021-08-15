const express = require('express');
const subscriber = require('../models/subscriber');
const router = express.Router();
const Subscriber = require('../models/subscriber');


// getting all subscribers
router.get('/', async (req, res) =>{
    try{
        const subscribers = await Subscriber.find();
        res.json(subscribers);

    }catch (err){

        res.status(500).json({ message: err.message })
    }
});
//getting by id
router.get('/:id', getSubscriber, (req, res) =>{
    res.json(res.subscriber);
});
// create a new subscriber
router.post('/', async(req, res) =>{
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })
    try{
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    }catch(err){
        res.status(400).json({message: err.message})
    }

});
// updating one
router.patch('/:id',getSubscriber, async(req, res) =>{
    if(res.body.name != null){
        res.subscriber.name = req.body.name;
    }

    try{
        const updateSubscriber = await res.subscriber.save()
        res.json(updateSubscriber);
    }catch(err){
        res.status(400).json({message: err.message})
    }
});
// deleting one
router.delete('/:id', getSubscriber, async(req, res) =>{
    try{
        await res.subscriber.remove();
        res.json({message: "Deleted"})
    }catch(err){
        res.status(500).json({ message: err.message})
    }
});

async function getSubscriber(req, res, next){
    let subscriber
    try{
        subscriber = await Subscriber.findById(req.params.id);
        if(subscriber == null){
           return  res.status(404).json({mesage: "subscriber not found"});
        }
    }catch(err){
        return res.json({message: err.mesage});
    }
    res.subscriber = subscriber;
    next()
}


module.exports = router;