const express = require("express");
const {
  signup,
  signin,
  logout,
  singleUser,
  userProfile,
} = require("../controllers/auth");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/logout", isAuthenticated, logout);
router.get("/getme", isAuthenticated, userProfile);
router.get("/user/:id", isAuthenticated, singleUser);
module.exports = router;
