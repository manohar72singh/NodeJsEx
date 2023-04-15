const express = require("express");
const mongooes = require("mongoose")
const app = express();
app.use(express.json());



//Api:
// connect to mongooes cloud
const mongoUrl = "mongodb+srv://manohar72singh:demoproject@cluster0.tnkl9kv.mongodb.net/?retryWrites=true&w=majority";
mongooes.connect(mongoUrl).then(()=>{
    console.log("Successfully connected to MongoDB Database");
}).catch((err)=>{
    console.log("Error connecting to MongoDB Database",err);
})
app.listen(2610,(err)=>{
    if(err) console.log(err);
    console.log("server is now live");
});
