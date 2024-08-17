const express = require('express');
const app = express();
const db = require('./db');
const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");
const bodyParser = require('body-parser');
const passport = require('./auth');


require('dotenv').config();

//Middleware BodyParser
app.use(bodyParser.json());

//Middleware Functions
const logRequest = (req,res,next)=>{
    console.log(`${new Date().toLocaleString()} Request Made To : ${req.originalUrl}`);
    next(); //Move onto the next phase
}
app.use(logRequest);



app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false});


app.get('/', (req,res)=>{
    res.send("Welcome to the website");
})


//Using the Routers
app.use('/person', localAuthMiddleware, personRoutes);
app.use('/menuItem',  menuItemRoutes);



const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`App is listening on Port ${PORT}`);
})