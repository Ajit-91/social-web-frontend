const express = require("express")
const router = express.Router();
const {upload} = require("../Helpers/fileHelper")
const {createPost, Comment, LikePost, fetchAllPosts, fetchUserPosts, fetchSinglePost} = require("../Controllers/postContollers")

// ======= Create Post===============
router.post("/api/createpost/:userId", upload.single("postImg"), createPost)
// ======= Comment on a Post============
router.post("/api/post/:postid/comment/:commentorid", Comment)
// ======= Like a Post===============
router.put("/api/post/:postid/like/:likerid", LikePost)
// ======= fetch user Posts ===============
router.get("/api/fetchUserPosts/:userid", fetchUserPosts)
// ======= fetch all Posts ===============
router.post("/api/fetchAllPosts", fetchAllPosts)
// ======= fetch single Post ===============
router.get("/api/fetchSinglePost/:postId", fetchSinglePost)

module.exports = router;