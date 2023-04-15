// ejs = embedded javascript (Templeting)
const express = require('express');
const app = express();
// const connect =  require('./dbconnect');

app.set('views','./views')
app.set('view engine', 'ejs');

app.get('/home',(req,res)=>{
    res.render('home');
    res.end();
})

app.get('/protfolio',(req,res)=>{
    res.render('protfolio');
    res.end()
})

// const mongoose = require('mongoose');


// //connection to database..
// mongoose.connect(process.env.DB_CONNECTION, 
//     { useNewUrlParser : true}, () =>{
//     console.log('connection to database')
//     });

app.listen(2610,(err)=>{
    if(err) console.log("error is ", err);
    console.log("server is live ")
})
