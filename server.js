const express = require('express');
const app = express();
const db = require('./db');
const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");
const bodyParser = require('body-parser');
require('dotenv').config();

//Middleware BodyParser
app.use(bodyParser.json());


//Using the Routers
app.use('/person', personRoutes);
app.use('/menuItem', menuItemRoutes);



const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`App is listening on Port ${PORT}`);
})