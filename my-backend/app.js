const Express = require('express');
const Mongoose= require('mongoose');
const Cors=require('cors');
const Bcrypt=require('bcrypt');
const Jwt=require('jsonwebtoken');
const userModel=require('./models/users');

let app=Express()
app.use(Express.json());
app.use(Cors());

Mongoose.connect("mongodb+srv://aseera:aseera@cluster0.x0tifel.mongodb.net/newnotApp?retryWrites=true&w=majority&appName=Cluster0")

app.post("/signUp",async(req,res)=>{
   
let input=req.body
let hashedPassword=Bcrypt.hashSync(req.body.password,10)
console.log(hashedPassword)
req.body.password=hashedPassword
// console.log(data)

userModel.find({email:req.body.email})
.then(
    (items)=>{
      if(items.length>0){
        res.json({"status":"User already exists"})

    }
    else{
        let result=new userModel(input)
         result.save()
        res.json({"status":"User created successfully"})
    }   
    })
        .catch(
            (error)=>{
                console.log(error)
            }
        )
        
        //    let check=userModel.find({email:req.body.email})
//    console.log(check)
//     if(check.length>0){
//         res.json({"status":"User already exists"})

//     }
//     else{
//         let result=new userModel(input)
//         await result.save()
//         res.json({"status":"User created successfully"})
//     }
})

// res.send(data)


app.listen(3030,()=>{
console.log("Server running")})