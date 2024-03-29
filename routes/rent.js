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

  getRentsForMember
);
router.post("/rent/saveRent", saveRent);
router.delete("/rent/deleteRent/:rentId", deleteRent);

router.get("/rent/getRentsInRange", getRentsInRange);
module.exports = router;
