const mongoose = require('mongoose');


const regSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String ,
        required:true
    }
})

const regdetails = new mongoose.model("regdetails",regSchema)
module.exports=regdetails;