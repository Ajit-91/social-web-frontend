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
        const userId = JSON.parse(req.body.id);
        const foundUser = await User.findById(userId).select("-password");
        if (foundUser) {
            res.status(200).json(foundUser);
        } else {
            res.status(404).json("User Not Found")
        }
    } catch (error) {
        console.log(error);
    }
}

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

module.exports = { registerUser, loginUser, fetchUser, followAUser }