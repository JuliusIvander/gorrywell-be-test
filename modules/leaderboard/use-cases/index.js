const reports = require('../../../models/reports');
const exercises = require('../../../models/exercises');

const makeClassroomReport = require('./classroom-report');
const makeLeaderboard = require('./leaderboard');

const classroomReport = makeClassroomReport({
  reports,
  exercises,
});
const leaderboard = makeLeaderboard({
  reports,
});

const leaderboardService = {
  classroomReport,
  leaderboard,
};

module.exports = Object.freeze({
  default: leaderboardService,
  ...leaderboardService,
});
