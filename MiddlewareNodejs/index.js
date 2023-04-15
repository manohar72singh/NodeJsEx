const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(vallidatePhoneNo);

//Signup Api
app.post('/login',(req,res)=>{
    const body = req.body;
    console.log("I have got Data:-", body.phoneNo );
    console.log("You have been signed up")
    res.json({
        message:"Signup successful"
    })
})

function vallidatePhoneNo(req, res, next){
    const body= req.body;
    if(!body.phoneNo){
        throw new Error("phoneNo is absent");
    }
    next();
}
server.listen(2610,'127.0.0.1',()=>{
    console.log("Server is Live :) ");
})