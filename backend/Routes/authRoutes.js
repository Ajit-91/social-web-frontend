const express = require("express")
const router = express.Router();
const { registerUser, loginUser, fetchUser, updateProfile, followOrUnfollow } = require("../Controllers/authControllers")
const {upload} = require("../Helpers/fileHelper")
// =====Register==========
router.post("/register", registerUser)
//  ====Login============
router.post("/login", loginUser)
//  ====fetch user============
router.get("/api/fetchUser/:userid", fetchUser)
//  ====update profile============
router.put("/api/updateprofile/:userid", upload.single("profileImg"), updateProfile)
//  ====Follow or Unfollow a user============
router.put("/api/followOrUnfollow/follower/:followerId/followingTo/:followingToId", followOrUnfollow)

module.exports = router;