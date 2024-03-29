const express = require("express");
const {
  getCampsForMember,
  getCampsForTeacher,
  getCampsInRange,
  saveCamp,
  deleteCamp,
  getCampsForTeacherInRange,
} = require("../controllers/camp");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();
router.get(
  "/camp/getCampsForTeacherInRange",
  isAuthenticated,
  getCampsForTeacherInRange
);
router.get("/camp/getCampsInRange", isAuthenticated, getCampsInRange);
router.get(
  "/camp/getCampsForMember/:memberId",
  isAuthenticated,
  getCampsForMember
);
router.get(
  "/camp/getCampsForTeacher/:teacherId",
  isAuthenticated,
  getCampsForTeacher
);
router.post("/camp/saveCamp", isAuthenticated, saveCamp);
router.delete("/camp/deleteCamp/:campId", isAuthenticated, deleteCamp);
module.exports = router;
