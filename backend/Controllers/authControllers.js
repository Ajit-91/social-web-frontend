const bcrypt = require('bcrypt');
const User = require("../Models/userSchema")

// ========Function to register a user====================

const registerUser = async (req, res) => {
    try {
        const { name, email, password, course, college } = req.body;
        if (!email || !name || !password || !course || !college) {
            console.log("one or more fields required");
            return res.status(400).json("one or more fields required")
        }

        const foundUser = await User.findOne({ email });

        if (foundUser) {
            return res.status(409).json({msg : "User Already exist"})
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
            res.status(200).json({msg : "success", resp : savedUser});

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
            return res.status(400).json({msg : "one or more fields required"})
        }

        const foundUser = await User.findOne({ email });
        if (foundUser) {
            const isMatching = await bcrypt.compare(password, foundUser.password);
            if (isMatching) {
                res.status(201).json({msg : "success", resp : foundUser});
            } else {
                return res.status(400).json({msg : "Either email or password is wrong"});
            }
        } else {
            return res.status(400).json({msg : "Either email or password is wrong"});
        }

    } catch (error) {
        console.log(error)
    }
}

// ========Function to fetch a user====================

const fetchUser = async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.userid)
                                                         .populate("followers", "name profileImg followers")
                                                         .populate("following", "name profileImg followers")
                                                         .select("-password")

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

const followOrUnfollow = async (req, res)=>{
    const follower = await User.findById(req.params.followerId)
    const followingTo = await User.findById(req.params.followingToId)

    try{
        if(!follower || !followingTo) return res.status(401).json("process failed : didn't recieved follower or followingTo userId")

        const followerIndex = followingTo.followers.indexOf(req.params.followerId)
        // followerIndex = -1 implies follower doesn't exits in following list of the user to whom tying to follow
        if(followerIndex == -1){
            // follow
            follower.following.push(req.params.followingToId)
            await follower.save()
        
            followingTo.followers.push(req.params.followerId)
            await followingTo.save()
            res.status(200).json("successfully followed")

        }else{
            // Unfollow
            const followingToIndex = follower.following.indexOf(req.params.followingToId)

            follower.following.splice(followingToIndex, 1)
            await follower.save()

            followingTo.followers.splice(followerIndex, 1)
            await followingTo.save()

            res.status(200).json("successfully unfollowed")

        }


    }catch(err){
        console.log(err)
        return res.status(400).json("process failed")
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
                profileImg : `${process.env.BASE_URL}/profileImgs/${file.filename}`
            }
        }else{
            update = {
                ...body
            }
        }
    
        const user = await User.findByIdAndUpdate(req.params.userid, update, {new : true}).select("-password")
        if (user) {
            res.status(200).json({msg : "success", resp : user});
        } else {
            res.status(404).json({msg : "User doesn't exist"})
        }

    }catch(err){
        console.log(err)
        res.status(400).json({msg : "process failed"})
    }

}

module.exports = { registerUser, loginUser, fetchUser, followOrUnfollow, updateProfile }