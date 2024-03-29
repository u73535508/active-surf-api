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

  getCampsForTeacherInRange
);
router.get("/camp/getCampsInRange", getCampsInRange);
router.get(
  "/camp/getCampsForMember/:memberId",

  getCampsForMember
);
router.get(
  "/camp/getCampsForTeacher/:teacherId",

  getCampsForTeacher
);
router.post("/camp/saveCamp", saveCamp);
router.delete("/camp/deleteCamp/:campId", deleteCamp);
module.exports = router;
