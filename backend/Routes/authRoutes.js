const express = require("express")
const router = express.Router();
const { registerUser, loginUser, fetchUser } = require("../Controllers/authControllers")

// =====Register==========
router.post("/register", registerUser)
//  ====Login============
router.post("/login", loginUser)
//  ====fetch user============
router.post("/api/fetchUser", fetchUser)

module.exports = router;