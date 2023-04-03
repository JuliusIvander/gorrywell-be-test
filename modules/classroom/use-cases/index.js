const classrooms = require('../../../models/classrooms');
const exercises = require('../../../models/exercises');
const reports = require('../../../models/reports');

const { buildPaginate, paginateArray } = require('../../../utils/pagination');
const { formValidation } = require('../../../utils/validation');

const makeClassroomList = require('./classroom-list');
const makeDeleteExercise = require('./delete-exercise');
const makeExerciseDetail = require('./exercise-detail');
const makeClassroomDetail = require('./classroom-detail');
const makeUpdateExercise = require('./update-exercise');

const classroomList = makeClassroomList({
  classrooms,
  buildPaginate,
  paginateArray,
});
const deleteExercise = makeDeleteExercise({
  exercises,
  reports,
});
const exerciseDetail = makeExerciseDetail({
  reports,
});
const classroomDetail = makeClassroomDetail({
  exercises,
});
const updateExercise = makeUpdateExercise({
  exercises,
  reports,
  formValidation,
});

const classroomService = Object.freeze({
  classroomList,
  deleteExercise,
  exerciseDetail,
  classroomDetail,
  updateExercise,
});

module.exports = {
  default: classroomService,
  ...classroomService,
};
