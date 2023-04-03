const classrooms = require('../../../models/classrooms');

const { buildPaginate, paginateArray } = require('../../../utils/pagination');

const makeMenteeList = require('./mentee-list');

const menteeList = makeMenteeList({
  classrooms,
  buildPaginate,
  paginateArray,
});

const mentorService = Object.freeze({
  menteeList,
});

module.exports = Object.freeze({
  default: mentorService,
  ...mentorService,
});
