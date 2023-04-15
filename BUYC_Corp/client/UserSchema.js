const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        unique: true,
        required: true,
    },
    password:{
        type:String,
        required: true,
    },
    usertype:{
        type:String,
    }
},{versionKey:false})
const userModel = mongoose.model('user', userSchema);
module.exports = userModel;