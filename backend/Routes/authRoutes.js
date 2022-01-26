const express = require("express")
const router = express.Router();
const { registerUser, loginUser, fetchUser, updateProfile } = require("../Controllers/authControllers")
const {upload} = require("../Helpers/fileHelper")
// =====Register==========
router.post("/register", registerUser)
//  ====Login============
router.post("/login", loginUser)
//  ====fetch user============
router.get("/api/fetchUser/:userid", fetchUser)
//  ====update profile============
router.put("/api/updateprofile/:userid", upload.single("profileImg"), updateProfile)

module.exports = router;