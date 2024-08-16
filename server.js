const express = require('express');
const app = express();
const db = require('./db');
const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");
const bodyParser = require('body-parser');
require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/person');

//Middleware BodyParser
app.use(bodyParser.json());

//Middleware Functions
const logRequest = (req,res,next)=>{
    console.log(`${new Date().toLocaleString()} Request Made To : ${req.originalUrl}`);
    next(); //Move onto the next phase
}

app.use(logRequest);

//Authentication Function
passport.use(new LocalStrategy(async (USERNAME,PASSWORD,done)=>{
    try{
        console.log('Recieved Credentials:', USERNAME, PASSWORD);
        const user = await Person.findOne({username:USERNAME});
        if(!user){
            return done(null,false,{message:'Incorrect Username'});
        }
        const isPasswordMatch = user.password === PASSWORD ? true:false;
        if(isPasswordMatch){
            return done(null, user);
        }else{
            return done(null,false,{message:'Incorrect Password'});
        }
    }catch(error){
        return done(err);
    }
}))

app.use(passport.initialize());


app.get('/',passport.authenticate('local',{session:false}),(req,res)=>{
    res.send("Welcome to the website");
})


//Using the Routers
app.use('/person',personRoutes);
app.use('/menuItem',menuItemRoutes);



const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`App is listening on Port ${PORT}`);
})