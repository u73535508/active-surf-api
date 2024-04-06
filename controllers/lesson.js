const Lesson = require("../models/lesson");
exports.saveLesson = async (req, res, next) => {
  try {
    if (req.body._id) {
      const lesson = await Lesson.findByIdAndUpdate(req.body._id, req.body);
      return res.status(201).json({ success: true, lesson });
    }
    const lesson = await Lesson.create(req.body);
    res.status(201).json({ success: true, lesson });
  } catch (error) {
    next(error);
  }
};

exports.getLessonsForMember = async (req, res, next) => {
  try {
    const lessons = await Lesson.find({ memberId: req.params.memberId });
    res.status(200).json({ success: true, lessons });
  } catch (error) {
    next(error);
  }
};

exports.getLessonsForTeacher = async (req, res, next) => {
  try {
    const lessons = await Lesson.find({ teacherId: req.params.teacherId });
    res.status(200).json({ success: true, lessons });
  } catch (error) {
    next(error);
  }
};
exports.getLessonsForTeacherInRange = async (req, res, next) => {
  const { startDate, endDate, teacherId } = req.query;
  try {
    const lessons = await Lesson.find({
      teacherId: teacherId,
      lessonDates: {
        $elemMatch: {
          $gte: new Date(startDate).toISOString(),
          $lte: new Date(endDate).toISOString(),
        },
      },
    });
    res.status(200).json(lessons);
  } catch (error) {
    next(error);
  }
};
exports.getLessonsInRange = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const lessons = await Lesson.find({
      lessonDates: {
        $elemMatch: {
          $gte: new Date(startDate).toISOString(),
          $lte: new Date(endDate).toISOString(),
        },
      },
    });

    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteLesson = async (req, res, next) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.lessonId);
    res.status(200).json({ success: true, lesson });
  } catch (error) {
    next(error);
  }
};
