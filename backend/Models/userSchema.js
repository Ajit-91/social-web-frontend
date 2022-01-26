const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    profileImg : {
        type : String,
        default : ""
    },
    bio : {
        type : String,
        default : "Hi I'm..."
    },
    course : {
        type : String,
        required : true
    },
    college : {
        type : String,
        required : true
    },
    followers : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],
    following : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],
    postCount : {
        type : Number,
        default : 0
    }
});

const User = mongoose.model( "User", userSchema);

module.exports = User;