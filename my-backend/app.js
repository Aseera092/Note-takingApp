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
app.post("/signUp", async (req, res) => {

    let input = req.body
    let hashedPassword = Bcrypt.hashSync(req.body.password, 10)
    console.log(hashedPassword)
    req.body.password = hashedPassword



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

app.put("/editnote/:id", async (req, res) => {
  const token = req.headers.token;

  Jwt.verify(token, "newnotApp", async (err, decoded) => {
    if (decoded && decoded.email) {
      noteModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((updatedNote) => {
          if (updatedNote) res.json({ status: "Note updated", note: updatedNote });
          else res.json({ status: "Note not found" });
        })
        .catch(() => res.json({ status: "Update failed" }));
    } else {
      res.json({ status: "Unauthorized" });
    }
  });
});



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



app.delete("/deletenote/:id", async (req, res) => {
    const noteId = req.params.id.trim(); 
    const token = req.headers.token;

    Jwt.verify(token, "newnotApp", async (error, decoded) => {
        if (error) {
            return res.status(401).json({ status: "Unauthorized", error: error.message });
        }

        if (decoded && decoded.email) {
            try {
                await noteModel.findByIdAndDelete(noteId);
                res.json({ status: "Note deleted" });
            } catch (err) {
                res.status(500).json({ status: "Error", error: err.message });
            }
        } else {
            res.status(403).json({ status: "Invalid token" });
        }
    });
});


app.post("/searchnotes", async (req, res) => {
    const { userId, notesDate, keyword } = req.body;
    const token = req.headers.token;

    Jwt.verify(token, "newnotApp", async (error, decoded) => {
        if (error) {
            return res.status(401).json({ status: "Unauthorized", error: error.message });
        }

        if (decoded && decoded.email) {
            try {
                const filter = { userId };
                if (notesDate) {
                    const date = new Date(notesDate);
                    const nextDate = new Date(date);
                    nextDate.setDate(date.getDate() + 1);

                    filter.notesDate = {
                        $gte: date,
                        $lt: nextDate
                    };
                }

                const results = await noteModel.find(filter);
                res.json({ status: "success", items: results });
            } catch (err) {
                res.status(500).json({ status: "Error fetching notes", error: err.message });
            }
        } else {
            res.status(403).json({ status: "Invalid token" });
        }
    });
});



app.listen(3030, () => {
    console.log("Server running")
})