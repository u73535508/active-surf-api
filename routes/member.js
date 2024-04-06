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
router.get("/member/getMember/:id", isAuthenticated, getMember);
router.get("/member/getDebtors", isAuthenticated, getDebtors);
router.post("/member/saveMember", isAuthenticated, saveMember);
router.delete("/member/deleteMember/:id", isAuthenticated, deleteMember);
module.exports = router;
