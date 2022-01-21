const express = require("express")
const router = express.Router();
const {createPost, Comment, LikePost} = require("../Controllers/postContollers")

// ======= Create Post===============
router.post("/api/createpost/:userId", createPost)
// ======= Comment on a Post============
router.post("/api/post/:postid/comment/:commentorid", Comment)
// ======= Like a Post===============
router.post("/api/post/:postid/like/:likerid", LikePost)

module.exports = router;