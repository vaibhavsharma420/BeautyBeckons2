const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuItem');

//Defining the Routes

router.get('/', async(req,res)=>{
    try{
        const menu = await MenuItem.find();
        res.json(menu);
    }catch(err){
        console.error("The error is",err);
        res.status(500).json({error:"Internal Server Error"});
    }
})

router.get('/:taste', async (req,res)=>{
    try{
        const taste = req.params.taste;
        const dataTaste = await MenuItem.find({taste:taste});
        res.json(dataTaste);
    }catch(err){
        console.error("The Error is:",err);
        res.status(500).json({error:"Internal Server Error"});
    }
})

router.post('/', async(req,res)=>{
    try{
        const data = req.body;
        const newData = new MenuItem(data);
        const savedData = await newData.save();
        console.log('data saved to the database');
        res.status(201).json(savedData);
    }catch(err){
        console.error("The Error is:",err);
        res.status(500).json({error:"Internal Server Error"});
    }
})

router.put('/:id', async(req,res)=>{
    const menuId = req.params.id;
    const updateData = req.body;
    const updatedData = await MenuItem.findByIdAndUpdate(menuId, updateData,{
        new:true, // Return the updated document
        runValidators:true, // Run Mongoose validation
    })
})

router.delete("/:id", async(req,res)=>{
    try{
        const menuId = req.params.id;
        const deletedData = await MenuItem.findByIdAndDelete(menuId);

        if(!deletedData){
            return res.status(404).json({error:'Person not found'});
        }
        res.json({message:'Item deleted successfully'});
    }catch(err){
        console.error('Error deleting person:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
    
    
})

module.exports = router;