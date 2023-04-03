const mongoose = require('mongoose');
const users = require('./users').default;
const exercises = require('./exercises').default;
const classrooms = require('./classrooms').default;

const Reports = mongoose.model('reports', {
  classroomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: classrooms,
    required: true,
  },
  exerciseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: exercises,
    required: true,
  },
  menteeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: users,
    required: true,
  },
  latestStatus: {
    type: String,
    enum: ['on-progress', 'submitted', 'completed'],
    default: 'on-progress',
  },
  answers: {
    type: String,
    default: null,
  },
  remarks: {
    type: Number,
    default: 0,
  },
  submittedAt: {
    type: Date,
    default: null,
  },
});

module.exports = Object.freeze({
  default: Reports,
  getReportsByExerciseAndMentee: async (classroomId, exerciseId, menteeId) => {
    const classId = new mongoose.Types.ObjectId(classroomId);
    const eId = new mongoose.Types.ObjectId(exerciseId);
    const mentId = new mongoose.Types.ObjectId(menteeId);

    const data = await Reports
      .findOne({
        exerciseId: eId,
        menteeId: mentId,
        classroomId: classId,
      })
      .populate('exerciseId')
      .exec();
    return data;
  },
  getReportsByExercise: async (classroomId, exerciseId) => {
    const classId = new mongoose.Types.ObjectId(classroomId);
    const eId = new mongoose.Types.ObjectId(exerciseId);
    const data = await Reports
      .aggregate([
        {
          $match: {
            exerciseId: eId,
            classroomId: classId,
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'menteeId',
            foreignField: '_id',
            as: 'menteeData',
            pipeline: [
              { $project: { _id: 1, name: 1 } },
            ],
          },
        },
        {
          $lookup: {
            from: 'exercises',
            localField: 'exerciseId',
            foreignField: '_id',
            as: 'exerciseData',
            pipeline: [
              {
                $project: {
                  _id: 1,
                  exerciseName: 1,
                  exerciseDescription: 1,
                  submittedBefore: 1,
                },
              },
            ],
          },
        },
        { $unwind: '$exerciseData' },
        { $unwind: '$menteeData' },
        {
          $group: {
            _id: '$exerciseData',
            mentees: {
              $push: {
                menteeData: '$menteeData',
                latestStatus: '$latestStatus',
                answers: '$answers',
                remarks: '$remarks',
                submittedAt: '$submittedAt',
              },
            },
          },
        },
      ])
      .exec();
    return data;
  },
  getClassroomLeaderboard: async (classroomId) => {
    const classId = new mongoose.Types.ObjectId(classroomId);
    const data = await Reports
      .aggregate([
        { $match: { classroomId: classId } },
        {
          $lookup: {
            from: 'users',
            localField: 'menteeId',
            foreignField: '_id',
            as: 'menteeData',
            pipeline: [
              { $project: { _id: 1, name: 1 } },
            ],
          },
        },
        { $unwind: '$menteeData' },
        {
          $group: {
            _id: '$menteeData',
            avgScore: { $avg: '$remarks' },
          },
        },
        { $sort: { avgScore: -1, '_id.name': 1 } },
      ])
      .exec();
    return data;
  },
  getClassroomReport: async (classroomId) => {
    const classId = new mongoose.Types.ObjectId(classroomId);
    const data = await Reports
      .aggregate([
        { $match: { classroomId: classId } },
        {
          $lookup: {
            from: 'classrooms',
            localField: 'classroomId',
            foreignField: '_id',
            as: 'classroomData',
            pipeline: [
              { $project: { className: 1 } },
            ],
          },
        },
        { $unwind: '$classroomData' },
        {
          $group: {
            _id: '$classroomData',
            completedExercises: {
              $sum: {
                $cond: [
                  {
                    $or: [
                      { $eq: ['$latestStatus', 'submitted'] },
                      { $eq: ['$latestStatus', 'completed'] },
                    ],
                  }, 1, 0,
                ],
              },
            },
            avgScore: { $avg: '$remarks' },
          },
        },
      ])
      .exec();
    return data;
  },
  getStudentsReport: async (classroomId) => {
    const classId = new mongoose.Types.ObjectId(classroomId);
    const data = await Reports
      .aggregate([
        { $match: { classroomId: classId } },
        {
          $lookup: {
            from: 'exercises',
            localField: 'exerciseId',
            foreignField: '_id',
            as: 'exerciseData',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'menteeId',
            foreignField: '_id',
            as: 'menteeData',
          },
        },
        { $unwind: '$exerciseData' },
        { $unwind: '$menteeData' },
        {
          $group: {
            _id: '$menteeData',
            submittedExercises: {
              $sum: {
                $cond: {
                  if: {
                    $or: [
                      { $eq: ['$latestStatus', 'submitted'] },
                      { $eq: ['$latestStatus', 'completed'] },
                    ],
                  },
                  then: 1,
                  else: 0,
                },
              },
            },
            lateSubmission: {
              $sum: {
                $cond: {
                  if: { $gt: ['$submittedAt', '$exerciseData.submittedBefore'] },
                  then: 1,
                  else: 0,
                },
              },
            },
            avgScore: { $avg: '$remarks' },
          },
        },
        { $sort: { '_id.name': 1 } },
      ])
      .exec();
    return data;
  },
  deleteReports: async (classroomId, exerciseId) => {
    await Reports.deleteMany({
      classroomId,
      exerciseId,
    });
  },
  updateReport: async ({
    classroomId,
    menteeId,
    exerciseId,
    params,
  }) => {
    await Reports.findOneAndUpdate(
      { menteeId, exerciseId, classroomId },
      params,
    );
  },
});
