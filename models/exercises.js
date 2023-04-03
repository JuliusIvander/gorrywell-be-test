const mongoose = require('mongoose');
const classrooms = require('./classrooms').default;

const Exercises = mongoose.model('exercises', {
  classroomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: classrooms,
    required: true,
  },
  exerciseName: {
    type: String,
    required: true,
  },
  exerciseDescription: {
    type: String,
    required: true,
  },
  submittedBefore: {
    type: Date,
    required: true,
  },
});

module.exports = Object.freeze({
  default: Exercises,
  getExerciseByClassroomId: async (classroomId) => {
    const data = await Exercises
      .aggregate([
        { $match: { classroomId: new mongoose.Types.ObjectId(classroomId) } },
        {
          $lookup: {
            from: 'classrooms',
            localField: 'classroomId',
            foreignField: '_id',
            as: 'classroomData',
            pipeline: [
              {
                $project: { _id: 1, className: 1, classDescription: 1 },
              },
            ],
          },
        },
        { $unwind: '$classroomData' },
        {
          $group: {
            _id: '$classroomData',
            exercises: {
              $push: {
                _id: '$_id',
                exerciseName: '$exerciseName',
              },
            },
          },
        },
      ])
      .exec();
    return data;
  },
  getClassroomReport: async (classroomId) => {
    const cId = new mongoose.Types.ObjectId(classroomId);
    const data = await Exercises
      .aggregate([
        { $match: { classroomId: cId } },
        {
          $lookup: {
            from: 'classrooms',
            localField: 'classroomId',
            foreignField: '_id',
            as: 'classroomData',
            pipeline: [
              {
                $project: {
                  _id: 1,
                  className: 1,
                  classDescription: 1,
                  mentees: 1,
                },
              },
            ],
          },
        },
        { $unwind: '$classroomData' },
        {
          $group: {
            _id: {
              classroomId: '$classroomId',
              menteeAssigned: '$classroomData.mentees',
            },
            givenExercises: { $sum: 1 },
          },
        },
      ])
      .exec();
    return data;
  },
  deleteExercise: async (classroomId, exerciseId) => {
    await Exercises.findByIdAndDelete({
      _id: exerciseId,
      classroomId,
    });
  },
  updateExercise: async ({ classroomId, exerciseId, params }) => {
    await Exercises.findOneAndUpdate(
      {
        _id: exerciseId,
        classroomId,
      },
      params,
    );
  },
});
