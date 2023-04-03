const useCase = require('../use-cases').default;

const { buildHttpResponse } = require('../../../utils/response');

const makeDeleteExercise = require('./delete-exercise');
const makeClasroomList = require('./get-classroom-list');
const makeExerciseDetail = require('./get-exercise-detail');
const makeClassroomDetail = require('./get-classroom-detail');
const makeUpdateExercise = require('./put-exercise');

const deleteExercise = makeDeleteExercise({
  useCase: useCase.deleteExercise,
  buildHttpResponse,
});
const classroomList = makeClasroomList({
  useCase: useCase.classroomList,
  buildHttpResponse,
});
const exerciseDetail = makeExerciseDetail({
  useCase: useCase.exerciseDetail,
  buildHttpResponse,
});
const classroomDetail = makeClassroomDetail({
  useCase: useCase.classroomDetail,
  buildHttpResponse,
});
const updateExercise = makeUpdateExercise({
  useCase: useCase.updateExercise,
  buildHttpResponse,
});

const classroomController = Object.freeze({
  deleteExercise,
  classroomList,
  exerciseDetail,
  classroomDetail,
  updateExercise,
});

module.exports = Object.freeze({
  default: classroomController,
  ...classroomController,
});
