const bcrypt = require('bcrypt');
const User = require("../Models/userSchema")

// ========Function to register a user====================

const registerUser = async (req, res) => {
    try {
        const { name, email, password, course, college } = req.body;
        if (!email || !name || !password || !course || !college) {
            console.log("one or more fields required");
            return res.status(400).json(" api one or more fields required")
        }

        const foundUser = await User.findOne({ email });

        if (foundUser) {
            return res.status(409).json("User Already exist")
        } else {
            const hash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
            const user = new User({
                name,
                email,
                password: hash,
                course,
                college
            });

            const savedUser = await user.save();
            res.status(200).json(savedUser);

        }
    } catch (err) {
        console.log(err);
    }

}

// ========Function to login a user====================

const loginUser = async (req, res) => {
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
            } else {
                return res.status(400).json("Either email or password is wrong");
            }
        } else {
            return res.status(400).json("Either email or password is wrong");
        }

    } catch (error) {
        console.log(error)
    }
}

// ========Function to fetch a user====================

const fetchUser = async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.userid).select("-password");
        if (foundUser) {
            res.status(200).json(foundUser);
        } else {
            res.status(404).json("User Not Found")
        }
    } catch (error) {
        console.log(error);
    }
}

// ========Function to follow a user====================

const followAUser = async (req, res)=>{
    const follower = await User.findById(req.params.followerId)
    const followingTo = await User.findById(req.params.followingToId)

    try{
        if(!follower || !followingTo) return res.status(401).json("process failed")

        follower.follwing.push(req.params.followerId)
        await follower.save()
    
        followingTo.follower.push(req.params.followerId)
        await followingTo.save()
    
        res.status(200).json("Success")
    }catch(err){
        console.log(err)
        return res.status(401).json("process failed due to err")
    }

}

// ========Function to update profile of a user====================

const updateProfile = async (req, res)=>{
    try{
        const file = req.file
        const body = req.body
        let update = {}

        if(file){
             update = {
                ...body,
                profileImg : `${process.env.BASE_URL}/ProfilePics/${file.filename}`
            }
        }else{
            update = {
                ...body
            }
        }
    
        const user = await User.findByIdAndUpdate(req.params.userid, update, {new : true}).select("-password")
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json("User doesn't exist")
        }

    }catch(err){
        console.log(err)
        res.status(400).json("process failed")
    }

}

module.exports = { registerUser, loginUser, fetchUser, followAUser, updateProfile }