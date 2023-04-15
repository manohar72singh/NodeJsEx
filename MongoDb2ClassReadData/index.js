const express = require('express');
const rateLimiter = require('express-rate-limit');
const mongoose = require('mongoose');
const app = express();
app.use(express.json())
const url ="mongodb://127.0.0.1:27017/cortana_db";
mongoose.connect(url).then((value)=>{
    console.log("Sucessfully connected to database");
}).catch((err)=>{
    console.log("Error connecting to database")
})

// define schema
const cs = new mongoose.Schema({
    NAME:{
        type:String
    },
    SUBJECT:{
        type:String
    },
    MARKS:{
        type:Number
    },
    IS_DELETED:{
        type:Boolean,
        default:false
    }
}, {versionKey: false})

const apiLimiter = rateLimiter({
    max:5,
    WindowMs:10000,
    message:"Plz Wait for Some Time"
})
app.use(apiLimiter)
const student_Schema = mongoose.model("student_marks",cs);


//   WITHOUT EXPRESS 


// find all data (filter) (sort)

// student_Schema.find({MARKS:{
//     "$lte":50
// }}).sort({MARKS:"1"}).exec((err,data)=>{
//     if(err){
//         console.log("Error finding",err)
//     }
//     else{
//         console.log("Successfully read Data from database", data)
//     }
// })


// insert data 

// student_Schema.create({NAME:"MANU",SUBJECT:"MERN",MARKS:100})
// .then((data)=>{
//     console.log("Data inserted successfully") 
// })

// find data by id

// student_Schema.findById("6343ff8f2b20dcb4ea3027f2",(err, data)=>{
//     console.log(data.NAME);
// })

// updata(findByIdAndeUpdate)

// student_Schema.findByIdAndUpdate("6343ff8f2b20dcb4ea3027f2",{NAME:"MANOHAR KUMAR SINGH",MARKS:99},(err, data)=>{
//     console.log(data);
// })

// student_Schema.findOneAndUpdate({NAME:"MANOHAR KUMAR SINGH",MARKS:99},{NAME:"MANOHAR SINGH",MARKS:101},(err, doc, res)=>{
    
//     console.log(doc);
//     console.log(res);
// })

// delete

// student_Schema.findByIdAndDelete("6343ff8f2b20dcb4ea3027f2",(err, data)=>{
//     console.log(data)
// })

// student_Schema.findOneAndDelete({NAME: "SANJAY",SUBJECT:"CHEMISTRY",MARKS:99},(err, data)=>{
//     console.log(data)
// })

//======== MAKE API ========
//get All Data
app.get('/marks', async(req, res)=>{
    const id = req.query.id;
    if(id){
        const marks = await student_Schema.findById(id);
        res.status(200).json(marks);
        return;
    }
    //not use body in use 
    
    const marks = await student_Schema.find()
    res.status(200).json(marks);
    return;
})

// find data

app.post('/marks_with_filter',async (req,res)=>{
    const body = req.body;
    if(body.NAME || body.SUBJECT || body.MARKS)
    {
        console.log("using body")
        const marks = await student_Schema.find(body)
        res.status(200).json(marks);
        return;
    }
    else{
        res.status(400).json({message:"Filter Not fount"})
        return;
    }
})

// Add Data to database

app.post('/addMarks',async (req, res) =>{
    const body = req.body;
    console.log("Incoming Data is",body)
    if(!body.NAME || !body.SUBJECT || !body.MARKS){
        res.status(404).json({message:"Data is Invalid"})
        return;
    }
    await student_Schema.create(body)
    res.status(201).json({message:"Data created successfully"})
})

//update Marks in database 

app.put('/updateMarks', async(req, res) =>{
    const body = req.body;
    //console.log(body)
    if(!body.id)
    {
        res.status(404).json({message:"ID is required"})
        return;
    }
    const id = body.id;
    const marksEntity = await student_Schema.findByIdAndUpdate(id,body)
    if(!marksEntity)
    {
        res.status(404).json({message:"ID does not exist"})
        return;
    }
    res.status(200).json({message:"Updated successfully"})
})

// hard delete

app.delete('/deleteMarks',async(req,res)=>{
    const id = req.query.id;
    if(!id){
        res.status(404).json({message:"ID does not exist"})
        return;
    }
    console.log("delete  id ",id)
    const deleteMarks = await student_Schema.findByIdAndDelete(id);
    if(!deleteMarks){
        res.status(404).json({message:"ID does not exist"})
        return;
    }
    res.status(200).json({message:"Successfully deleted marks"})
})


//soft Delete

app.delete('/softDelete', async(req,res)=>{
    const id = req.query.id;
    if(!id){
        res.status(404).json({message:"ID does not exist"})
        return;
    }
    console.log("deletion for this id ",id)
    const updateEntity = await student_Schema.findByIdAndUpdate(id,{IS_DELETED:true})
    res.status(200).json({message:"Data Got deleted",})
})

// pagenation api

app.get('/page_marks', async (req, res) => {
    const page = req.query.page;
    //console.log(page);
    if(!page){
        res.status(404).json({message:"Invalid page is required"})
        return;
    }
    const marks = await student_Schema.find().limit(10).skip((page-1)*10).exec()
    if(marks.length==0)
    {
        res.status(404).json({message:"Invalid page No is required"})
        return;
    }
    const totalMarks = await student_Schema.count()
    res.json({totalMarks, marks})
})



app.listen(2610,(err)=>{
    if(err) console.log("error is ", err);
    console.log("server is live ")
})

