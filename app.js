require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose")

require('./src/config/passport')
require('dotenv').config();

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoose.connect(process.env.MONGOURI);


app.use('/v1',require('./src/routes'))


app.listen(process.env.PORT, ()=>{console.log("El servidor esta listo");});

app.get('/',(req, res) => res.send("Hola Mundo"))



