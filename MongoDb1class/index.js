const express = require('express');
const app = express();

const mongoose = require('mongoose')
const url ="mongodb://127.0.0.1:27017/cortana_db"

mongoose.connect(url).then((value)=>{
    console.log("Successfully connected to MongoDB Database")
}).catch((e)=>{
    console.log("Error connecting to MongoDB Database",e)
})

// create schema

//const Schema = mongoose.Schema;
const cs = new mongoose.Schema({
    name:{
        type:String,
    },
    phoneNo:{
        type:String,
    }
}, {versionKey: false})
const userDetail = mongoose.model("User_Detail",cs);

// insert sone data
userDetail.create({
    name:"Dhiraj singh",
    phoneNo:"9771157571"
}).then((value)=>{
    console.log("Data is -",value);
}).catch((err)=>{
    console.log("error is -",err);
})

app.listen(2610,(err)=>{
    if(err) console.log("error is ", err);
    console.log("server is live ")
})