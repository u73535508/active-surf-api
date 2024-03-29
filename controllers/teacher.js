const Teacher = require("../models/teacher");
async function saveTeacher(req, res, next) {
  try {
    const id = req.body.id;
    const teacherExist = await Teacher.findById(id);
    if (teacherExist) {
      const teacher = await Teacher.findByIdAndUpdate(id, req.body);
      return res.status(201).json({ success: true, teacher });
    }
    const teacher = await Teacher.create(req.body);
    res.status(201).json({ success: true, teacher });
  } catch (error) {
    next(error);
  }
}

async function getAllTeachers(req, res) {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteTeacher(req, res) {
  const id = req.params.id;

  try {
    const teacher = await Teacher.findByIdAndDelete(id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  saveTeacher,
  getAllTeachers,
  deleteTeacher,
};
