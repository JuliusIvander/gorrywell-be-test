const useCase = require('../use-cases').default;

const { buildHttpResponse } = require('../../../utils/response');

const makeMenteeList = require('./get-mentee-list');

const getMenteeList = makeMenteeList({
  useCase: useCase.menteeList,
  buildHttpResponse,
});

const mentorController = Object.freeze({
  getMenteeList,
});

module.exports = {
  default: mentorController,
  ...mentorController,
};
