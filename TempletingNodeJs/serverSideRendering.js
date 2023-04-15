const express = require('express');
const app = express();
const ejs = require('ejs');


// app.get('/food',(req,res)=>{
    
//     ejs.renderFile('./food.ejs',null,null,(err, ejsFile)=>{
//         if(err)
//         {
//             console.log("error is ",err)
//         }
//         else{
//             res.send(ejsFile)
//         }
//     })
// })

app.get('/foods',(res,req)=>{
    console.log("hit api")
    ejs.renderFile('./food.ejs',null,null,(err, htmlFile)=>{
        if(err)
        console.log("error is", err)
        else
        //res.send(ejsFile)
        res.send(htmlFile)
    })
})

app.listen(2610,(err)=>{
    if(err) console.log("error is ", err);
    console.log("server is live ")
})
