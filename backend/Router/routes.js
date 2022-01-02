const express = require("express")
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../Models/userSchema")

// =====Register==========
router.post("/register", async (req, res) => {
    try{
        const { name, email, password } = req.body;
        if (!email || !name || !password) {
            console.log("one or more fields required");
           return res.status(400).json(" api one or more fields required")
        }
        
        const foundUser = await User.findOne({email});

        if (foundUser) {
           return res.status(409).json("User Already exist")
        } else {
            const hash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
            const user = new User({
                name,
                email,
                password: hash
            });
    
            const savedUser = await user.save();
            res.status(200).json(savedUser);
    
        }
    }catch(err){
        console.log(err);
    }
   
});

//  ====Login=======
router.post("/login", async (req, res) => {
    try {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json(" api one or more fields required")
    }

    const foundUser = await User.findOne({ email });
    if (foundUser) {
        const isMatching = await bcrypt.compare(password, foundUser.password);
        if (isMatching) {
            res.status(201).json(foundUser);
        }
    } else {
        return res.status(400).json("Invalid Credentials");
    }

    } catch (error) {
        console.log(error)
    }
})


router.post("/fetchUser", async (req, res)=>{
    try {
    const userId = JSON.parse(req.body.id);
    const foundUser = await User.findById(userId);
    if(foundUser){
        res.status(200).json(foundUser);
    }else{
        res.status(404).json("User Not Found")
    }
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;