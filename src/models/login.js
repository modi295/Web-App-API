const mongoose = require('mongoose');


const loginSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    password:{
        type:String ,
        required:true
    }
})

const logindetails = new mongoose.model("logindetails",loginSchema)
module.exports=logindetails;