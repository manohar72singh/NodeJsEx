const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
app.use(express.json());
//app.use(vallidatePhoneNo);
//app.use(middleWare);
const cookie = require('cookie-parser');
app.use(cookie());
//Signup Api
app.post('/login',vallidatePhoneNo,middleWare,(req,res)=>{
    const body = req.body;
    console.log("I have got Data:-", body.phoneNo );
    console.log("You have been signed up")
    res.cookie("screat_code","2610");
    res.json({
        message:"Signup successful"
    })
})
app.get('/random',(req,res)=>{
    console.log("random request")
    res.send({message:"random request successful"})
}) 

function middleWare(req,res, next){
    console.log("i am temp")
    next();
}
function vallidatePhoneNo(req, res, next){
    const body= req.body;
    if(!body.phoneNo){
        throw new Error("phoneNo is absent");
    }
    next();
}

app.get('/isLogin',(req,res)=>{
    const cookie = req.cookies;
    console.log("cookie is",cookie.screat_code)
    if(cookie.screat_code)
    res.status(200).send({message:"cookie accepted"})
    else
    res.status(404).send({  message:"cookie not accepted"})
})
server.listen(2610,'127.0.0.1',()=>{
    console.log("Server is Live :) ");
})