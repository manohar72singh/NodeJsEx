const express = require('express');
const mongoose = require('mongoose');
const userSchema = require('./UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenVerification = require('./TokenVerification');
const app = express();
app.use(express.json())

const secretKey = "ManoharKumarSinghManoharKumarSinghManoharKumarSinghManoharKumarSingh";
//connect to mongooseDb

const url ="mongodb://127.0.0.1:27017/cortana_db";
mongoose.connect(url).then((value)=>{
    console.log("Sucessfully connected to database");
}).catch((err)=>{
    console.log("Error connecting to database")
})

// REGISTER API

app.post('/register', async(req, res)=>{
    const body = req.body;
    if(!body.name || !body.email || !body.password)
    {
        res.status(404).json({message:"Data Is Invalid"})
        return;
    }
    const emailExits = await userSchema.findOne({email:body.email});
    if(emailExits)
    {
        res.status(404).json({message:"Email Id Alredy Exits"})
        return;
    }
    body.password = await bcrypt.hash(body.password,6);
    await userSchema.create(body);
    res.status(201).json({message:"Registration Successfully"})
    return;
})

//  LOGIN API

app.post('/login', async (req, res) =>{
    const body = req.body;
    if(!body.email || !body.password)
    {
        res.status(404).json({message:"Login data  is invallid"})
        return;
    }
    const isUserExits = await userSchema.findOne({email:body.email})
    if(!isUserExits)
    {
        res.status(404).json({message:"User does not exist"});
        return;
    }
    const isPasswordCorrect = await bcrypt.compare(body.password, isUserExits.password)
    if(!isPasswordCorrect)
    {
        res.status(401).json({message:"Username/Password is incorrect"})
        return;
    }
    // token 
    const userToken = jwt.sign(body,secretKey,{expiresIn:"1d"});
    res.status(200).json({token:userToken});

})

app.get('/curical_data',tokenVerification,async(req,res)=>{
    console.log("verification successful")
    res.json({message:"verification successful"})
})

app.listen(2610,(err)=>{
    if(err) console.log("error is ", err);
    console.log("server is live ")
})