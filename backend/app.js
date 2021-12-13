require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require("./Models/userSchema")

mongoose.connect(process.env.DB_CONNECTION);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello world");
})

// app.get("/login", (req, res)=>{
//     res.send(__dirname);
// })
app.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !name || !password) {
        res.send("one or more fields required")
    }
    User.findOne({email}, (err, foundUser)=>{
        if(!err && foundUser){
            res.send("User Already exist")
        }else{
            bcrypt.hash(password, Number(process.env.SALT_ROUNDS) , (err, hash) => {
                if (err) {
                    console.log(err);
                    res.send(err)
                } else {
                    const user = new User({
                        name,
                        email,
                        password: hash
                    });
                    user.save((error) => {
                        if (error) {
                            console.log(error);
                        } else {
                            res.send("post success");
                        }
                    });
                }
            });
        }
    })


});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.send("one or more fields required")
    } else {
        User.findOne({ email }, (err, foundUser) => {
            if (err) {
                res.send(err);
            } else {
                if (foundUser) {
                    bcrypt.compare(password, foundUser.password, (error, result) => {
                        if (result && !error) {
                            res.send("You found your secret");
                        } else {
                            res.send(error);
                        }
                    })
                }else{
                    res.send("no user found")
                }
            }
        })
    }
})


app.listen(process.env.PORT, () => {
    console.log("server started");
})