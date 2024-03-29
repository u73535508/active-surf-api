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
  isAuthenticated,
  getLessonsForTeacherInRange
);
router.get("/lesson/getLessonsInRange", isAuthenticated, getLessonsInRange);
router.get(
  "/lesson/getLessonsForMember/:memberId",
  isAuthenticated,
  getLessonsForMember
);
router.get(
  "/lesson/getLessonsForTeacher/:teacherId",
  isAuthenticated,
  getLessonsForTeacher
);
router.post("/lesson/saveLesson", isAuthenticated, saveLesson);
router.delete("/lesson/deleteLesson/:lessonId", isAuthenticated, deleteLesson);
module.exports = router;
