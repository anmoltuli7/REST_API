require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', (error)=>console.log(error));
db.once('open',()=>console.log("connected to database"));


app.use(express.json());

const subscribersRouter = require('./routers/subscribers')

app.use('/subscribers', subscribersRouter);

app.listen(3000, ()=>{
    console.log("server is started");
})