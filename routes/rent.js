const express = require("express");
const {
  getRentsForMember,
  saveRent,
  deleteRent,
  getRentsInRange,
} = require("../controllers/rent");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.get(
  "/rent/getRentsForMember/:memberId",
  isAuthenticated,
  getRentsForMember
);
router.post("/rent/saveRent", isAuthenticated, saveRent);
router.delete("/rent/deleteRent/:rentId", isAuthenticated, deleteRent);

router.get("/rent/getRentsInRange", isAuthenticated, getRentsInRange);
module.exports = router;
