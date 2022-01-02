require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECTION).then(()=>{
    console.log("connection succesfull ");
}).catch((err)=>console.log(err));

 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./Router/routes"))




app.listen(process.env.PORT, () => {
    console.log("server started at port "+process.env.PORT);
})