const useCase = require('../use-cases').default;

const { buildHttpResponse } = require('../../../utils/response');

const makeClassroomReport = require('./get-classroom-report');
const makeLeaderboard = require('./get-leaderboard');

const getClassroomReport = makeClassroomReport({
  useCase: useCase.classroomReport,
  buildHttpResponse,
});
const getLeaderboard = makeLeaderboard({
  useCase: useCase.leaderboard,
  buildHttpResponse,
});

const leaderboardController = {
  getClassroomReport,
  getLeaderboard,
};

module.exports = Object.freeze({
  default: leaderboardController,
  ...leaderboardController,
});
