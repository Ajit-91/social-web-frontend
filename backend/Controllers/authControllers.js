const bcrypt = require('bcrypt');
const User = require("../Models/userSchema")

// ========Function to register a user====================

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!email || !name || !password) {
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
                password: hash
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
        const foundUser = await User.findById(userId);
        if (foundUser) {
            res.status(200).json(foundUser);
        } else {
            res.status(404).json("User Not Found")
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { registerUser, loginUser, fetchUser }