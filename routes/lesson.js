const express = require("express");
const {
  getLessonsForMember,
  getLessonsForTeacher,
  getLessonsInRange,
  saveLesson,
  deleteLesson,
  getLessonsForTeacherInRange,
} = require("../controllers/lesson");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();
router.get(
  "/lesson/getLessonsForTeacherInRange",

  getLessonsForTeacherInRange
);
router.get("/lesson/getLessonsInRange", getLessonsInRange);
router.get(
  "/lesson/getLessonsForMember/:memberId",

  getLessonsForMember
);
router.get(
  "/lesson/getLessonsForTeacher/:teacherId",

  getLessonsForTeacher
);
router.post("/lesson/saveLesson", saveLesson);
router.delete("/lesson/deleteLesson/:lessonId", deleteLesson);
module.exports = router;
