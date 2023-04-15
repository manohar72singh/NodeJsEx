const express = require('express');
const mongoose = require('mongoose');
const userModel = require('./UserSchema');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const app = express();
app.use(express.json());
app.use(cors());
const secretKey = "0ManoharKumarSingh1ManoharKumarSingh2ManoharKumarSingh3ManoharKumarSingh";
const mongooUrl = "mongodb+srv://manohar72singh:buycars@cluster0.rlwmz5w.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongooUrl).then(() => {
    console.log("Successfully connected to MongoDB Database");
}).catch((err) => {
    console.log("Error connecting to MongoDB Database", err);
})

app.post('/signUp', async (req, res) => {
    const body = req.body;
    try {
        if (!(body.name || body.email || body.password || body.usertype)) {
            res.status(400).json({ message: "Data is Invallid", status: false })
            return;
        }
        const emailExits = await userModel.findOne({ email: body.email });
        if (emailExits) {
            res.status(404).json({ message: "Email already exists", status: false });
            return;
        }
        body.password = await bcrypt.hash(body.password, 6)
        const savedata = await userModel.create(body);
        res.status(201).json({ message: "SignUp successful", status: true })
        return;
    }
    catch (err) {
        console.log(err);
    }
})

app.post("/signIn", async (req, res) => {
    const body = req.body;
    try {
        if (!(body.email || body.password)) {
            res.status(400).json({ message: "Data is Invalid", status: false })
            return;
        }
        const userEmailExits = await userModel.findOne({ email: body.email })
        if (!userEmailExits) {
            res.status(404).json({ message: "User Not Found", status: false })
            return;
        }
        if (await bcrypt.compare(body.password, userEmailExits.password)) {
            const token = jwt.sign({ email: body.email }, secretKey, {
                expiresIn: "1h"
            });
            res.status(200).json({ message: "signIn successful", status: true, token: token, data: userEmailExits });
            return;
        }
        else {
            res.status(404).json({ message: "password not matched", status: false })
            return;
        }
    }
    catch (err) {
        console.log("error is ", err);
    }
})

app.post("/userData", async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, secretKey, (err, res) => {
            if (err) {
                return "token expired";
            }
            return res;
        });
        if (user === "token expired") {
            return res.status(400).json({ status: false, data: "token expired" });
        }
        const userEmail = user.email;
        userModel.findOne({ email: userEmail })
            .then((data) => {
                res.status(200).json({ message: "user found", status: true, data: data });
            })
            .catch((err) => {
                res.status(400).json({ message: "token not found", err: err });
            })
    } catch (err) {
        res.status(400).json({ message: "user not found", err: err });
    }

})

app.get('/getAllUsers', async (req, res) => {
    try {
        const allUser = await userModel.find({});
        res.status(200).json({ message: "all users found", status: true, userData: allUser });
    } catch (error) {
        console.log(error);
    }
})

app.post('/deleteUser', async (req, res) => {
    const { userId } = req.body;
    try {
        const deluser = await userModel.deleteOne({ _id: userId })
        if (deluser) {
            res.status(200).json({ message: 'successfully deleted', status: true });
        }
        else{
            res.status(500).json({message:'Error', status:false});
        }

    } catch (err) {
        console.log(err)
    }
});
app.listen(2610, (err) => {
    if (err) console.log("Error is ", err);
    console.log("server is live");
})