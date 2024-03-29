const express = require("express");
const {
  getAllTeachers,
  saveTeacher,
  deleteTeacher,
} = require("../controllers/teacher");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.get("/teacher/getAllTeachers", getAllTeachers);
router.post("/teacher/saveTeacher", saveTeacher);
router.delete("/teacher/deleteTeacher/:id", deleteTeacher);
module.exports = router;
