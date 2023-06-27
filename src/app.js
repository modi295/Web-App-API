const express = require("express");
require("../src/db/conn");
const regdetails = require("../src/models/Reg")
const logindetails=require("../src/models/login")
const cors= require('cors');
const jwt =require("jsonwebtoken");
const secretKey="secretkey";

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());


app.get("/",async(req,res)=>{
    res.send("hello port");
})

app.listen(port, ()=>{
    console.log(`connect is live on port no. ${port}`);
})

app.post("/login", async(req,res)=>{
    try{
        const addinglogindetails = new logindetails(req.body)
        console.log(req.body);
        const insertlogin =await addinglogindetails.save();
        
        const token = jwt.sign({
            insertlogin
        },secretKey,{expiresIn:'300s'}
        );
        res.status(200).json({token}); 
    }
    catch(e){
        res.status(400).send(e);
    }
})


app.post("/reg", async(req,res)=>{
    try{
        const addingregdetails = new regdetails(req.body)
        console.log(req.body);
        const insertReg =await addingregdetails.save();
        res.status(201).send(insertReg);
    }catch(e){
        res.status(400).send(e);

    }
})

app.get("/reg", async(req,res)=>{
    try{
        const getreg = await regdetails.find({});
        res.status(201).send(getreg);
    }catch(e){
        res.status(400).send(e);

    }

})
function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const token= bearer[1];
        req.token=token;
        next();
    
    }else{
        res.send({
            result:'token is not valid'
        })
    }
    }

    app.post("/about",verifyToken,(req,res)=>{
        jwt.verify(req.token,secretKey,(err,authData)=>{
            if(err){
                res.send({result:"invalid token"})
            }
            else{
                res.json({
                    message:" profile accessed",
                    authData
                })
            }
        })
    
    })  
