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
router.get("/logout", logout);
router.get("/getme", userProfile);
router.get("/user/:id", singleUser);
module.exports = router;
