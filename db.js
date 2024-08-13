 const mongoose = require('mongoose');

 //Define the MongoDB Connection
const mongoURL = 'mongodb://localhost:27017/prac';

//Setup MongoDB Connection
mongoose.connect(mongoURL,{
    
})

//Get the default Connection
//Mongoose maintains a default connection object representing the MongoDB connection
const db = mongoose.connection;

//Define Event Listeners
db.on('connected',()=>{
    console.log('Connected to MongoDB');
});
db.on('error',()=>{
    console.log('MongoDB connection error:',err);
});
db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
});

//Export the database connection
module.exports = db;