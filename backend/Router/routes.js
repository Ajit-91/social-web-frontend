const express = require("express")
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require("../Models/userSchema")



router.post("/fetchUser", (req, res)=>{
    const userId = JSON.parse(req.body.id);

    User.findById(userId, (err, foundUser)=>{
        if (err) {
            console.log(err)
        } else {
            if(foundUser){
                res.status(200).json(foundUser);
            }else{
                res.status(404).json("User Not Found")
            }
        }
    })
})

router.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !name || !password) {
        console.log("one or more fields required");
        res.send("one or more fields required")
    }else{
        
    User.findOne({email}, (err, foundUser)=>{
        if(!err && foundUser){
            res.status(409).json({msg : "User Already exist"})
        }else{
            bcrypt.hash(password, Number(process.env.SALT_ROUNDS) , (err, hash) => {
                if (err) {
                    console.log(err);
                } else {
                    const user = new User({
                        name,
                        email,
                        password: hash
                    });
                    user.save((error, savedUser) => {
                        if (error) {
                            console.log(error);
                        } else {
                            res.status(200).json(savedUser);
                        }
                    });
                }
            });
        }
    })
}
});

router.post("/login", (req, res) => {
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
                            res.status(201).json(foundUser);
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



module.exports = router;