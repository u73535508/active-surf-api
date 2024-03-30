const express = require("express");
const {
  saveMember,
  getMember,
  getAllMembers,
  deleteMember,
  getDebtors,
} = require("../controllers/member");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.get("/member/getAllMembers", isAuthenticated, getAllMembers);
router.get("/member/getMember/:id", getMember);
router.get("/member/getDebtors", getDebtors);
router.post("/member/saveMember", saveMember);
router.delete("/member/deleteMember/:id", deleteMember);
module.exports = router;
