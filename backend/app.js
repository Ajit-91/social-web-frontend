require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require("./Models/userSchema")

mongoose.connect(process.env.DB_CONNECTION).then(()=>{
    console.log("connection succesfull ");
}).catch((err)=>console.log(err));
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello world");
})
app.get("/register", (req, res)=>{
    res.send("Register page")
})
// app.get("/login", (req, res)=>{
//     res.send(__dirname);
// })
app.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !name || !password) {
        console.log("one or more fields required");
        res.send("one or more fields required")
    }else{
        
    User.findOne({email}, (err, foundUser)=>{
        if(!err && foundUser){
            res.json("User Already exist")
        }else{
            bcrypt.hash(password, Number(process.env.SALT_ROUNDS) , (err, hash) => {
                if (err) {
                    console.log(err);
                    // res.send(err)
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
                            res.json("Registered successfully");
                        }
                    });
                }
            });
        }
    })
}
    

});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.json("one or more fields required")
    } else {
        User.findOne({ email }, (err, foundUser) => {
            if (err) {
                console.log(err);
            } else {
                if (foundUser) {
                    bcrypt.compare(password, foundUser.password, (error, result) => {
                        if (result && !error) {
                            res.json("You found your secret");
                            // res.redirect("/dashboard")
                        } else {
                            console.log(error);
                        }
                    })
                }else{
                    res.json("no user found")
                }
            }
        })
    }
})


app.listen(process.env.PORT, () => {
    console.log("server started at port "+process.env.PORT);
})