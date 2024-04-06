const express = require("express");
const {
  getAllTeachers,
  saveTeacher,
  deleteTeacher,
} = require("../controllers/teacher");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.get("/teacher/getAllTeachers", isAuthenticated, getAllTeachers);
router.post("/teacher/saveTeacher", isAuthenticated, saveTeacher);
router.delete("/teacher/deleteTeacher/:id", isAuthenticated, deleteTeacher);
module.exports = router;
