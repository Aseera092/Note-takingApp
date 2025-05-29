const Express = require('express');
const Mongoose = require('mongoose');
const Cors = require('cors');
const Bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const userModel = require('./models/users');
const noteModel = require('./models/notes');

let app = Express()
app.use(Express.json());
app.use(Cors());

Mongoose.connect("mongodb+srv://aseera:aseera@cluster0.x0tifel.mongodb.net/newnotApp?retryWrites=true&w=majority&appName=Cluster0")
//Sign Up
app.post("/signUp", async (req, res) => {

    let input = req.body
    let hashedPassword = Bcrypt.hashSync(req.body.password, 10)
    console.log(hashedPassword)
    req.body.password = hashedPassword
    // console.log(data)

    userModel.find({ email: req.body.email })
        .then(
            (items) => {
                if (items.length > 0) {
                    res.json({ "status": "User already exists" })

                }
                else {
                    let result = new userModel(input)
                    result.save()
                    res.json({ "status": "User created successfully" })
                }
            })
        .catch(
            (error) => {
                console.log(error)
            }
        )

})

//Sign In
app.post("/signIn",async(req,res)=>{
    let input = req.body
    let result=userModel.find({ email: req.body.email }).then(
        (items) => {
            if (items.length > 0) {
                const passwordValidator = Bcrypt.compareSync(req.body.password, items[0].password)
                if (passwordValidator) {
                    Jwt.sign({ email: req.body.email },"newnotApp",{ expiresIn:"3d"},
                        (error, token) => {
                            if (error) {
                                res.json({ "status": "error", "Errormessage": error })
                            } else {
                                res.json({ "status": "Login Success", "token": token, "userId": items[0]._id })
                            }
                        })
                } else {
                    res.json({ "status": "Incorrect Password" })
                }
            } else {
                res.json({ "status": "Invalid Email ID" })
            }
        }
    ).catch(
        (error) => {
            res.json({ "status": "Incorect Password", "Errormessage": error })
        }
    )
})

// notes creation
app.post("/create",async (req, res) => {
    let input = req.body
    let token = req.headers.token
    Jwt.verify(token, "newnotApp",async(error,decoded)=>{
        if (decoded && decoded.email) {

            let result= new noteModel(input)
            await result.save()
            console.log(input)
            res.json({"status":"Note Creation Successfully"})
        } else {
            res.json({"status":"Invalid Authentication"})
        }
    })
})

//viewallmy notes
app.post("/viewmynotes",async (req, res) => {
    let input = req.body
    let token=req.headers.token
    Jwt.verify(token, "newnotApp",async(error,decoded)=>{
        if (decoded && decoded.email) {
            noteModel.find(input).then(
                (items)=>{
                    res.json({items})
                }
            ).catch(
                (error)=>{
                    res.json({"status":"Error"})
                }   )
        } else {
            res.json({"status":"Error"})
        }
    })
})


app.listen(3030, () => {
    console.log("Server running")
})