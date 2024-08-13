const express = require('express');
const router = express.Router();
const Person = require('../models/person');

//Define Routes for Person

router.get('/', async (req,res)=>{
    try{
        const persons = await Person.find(); //Use the Mongoose Model to fetch all persons from the database
        res.json(persons); //Send the list of persons as a json response
    }catch(err){
        console.err("The Error is:",err);
        res.status(500).json({error:"Internal Server Error"});
    }
    
})

router.get('/:work', async(req,res)=>{
    try{
        const workType = req.params.work;
        const persons = await Person.find({work:workType});
        res.json(persons);
    }catch(err){
        console.error("The Error is:",err);
        res.status(500).json({error:"Internal Server Error"});
    }
})

router.post('/', async(req,res)=>{
    try{
        const newPersonData = req.body; //Assuming the request body contains the person data
        const newPerson = new Person(newPersonData); //Create a new Person document using the Mongoose Model
        const savedPerson = await newPerson.save(); //Save the new Person to the database using await
        console.log("saved person to the database");
        res.status(201).json(savedPerson);
    }catch(err){
        console.error("The Error is:",err);
        res.status(500).json({error:"Internal Server Error"});
    }
})

router.put('/:id', async(req,res)=>{
    try{
        const personId = req.params.id; // Extract the person's ID from the URL parameter
        const updatedPersonData = req.body; // Updated data for the person

        const updatedPerson = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true, // Return the updated document
            runValidators:true, // Run Mongoose validation
        });
        if(!updatedPerson){
            return res.status(404).json({error:'Person not found'});
        }
        console.log('data updated');
        res.status(200).json(updatedPerson);
    }catch(err){
        console.error('Error updating person:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const personId = req.params.id; // Extract the person's ID from the URL parameter
        const deletedPerson = await Person.findByIdAndDelete(personId);

        if(!deletedPerson){
            return res.status(404).json({error:'Person not found'});
        }
        res.json({message:'Person deleted successfully'});
    }catch(err){
        console.error('Error deleting person:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;