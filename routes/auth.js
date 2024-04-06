const express = require("express");
const {
  signup,
  signin,
  singleUser,
  userProfile,
} = require("../controllers/auth");
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/getme", userProfile);
router.get("/user/:id", singleUser);
module.exports = router;
