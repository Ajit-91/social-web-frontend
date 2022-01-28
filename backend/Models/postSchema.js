const mongoose = require("mongoose")
const commentSchema = require("./commentSchema")

const postSchema = new mongoose.Schema({
    creator : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    postImg : {
        type : String,
    },
    description : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    },
    likes : {
        likeCount : {
            type : Number,
            default : 0
        },
        likedBy : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }]
    },
    comments : [commentSchema],
})

module.exports = mongoose.model("Post", postSchema)
