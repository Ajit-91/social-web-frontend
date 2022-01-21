const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment : {
        type : String,
        required : true
    },
    commentedAt : {
        type : Date,
        default : Date.now
    },
    commentBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    }
})

module.exports = commentSchema