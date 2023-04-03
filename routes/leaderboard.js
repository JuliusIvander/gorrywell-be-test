const router = require('express').Router();
const Auth = require('../middlewares/auth-middleware');
const PermissionAuth = require('../middlewares/auth-permissions');

const leaderboardController = require('../modules/leaderboard/controllers').default;

router.get('/:cId', Auth, PermissionAuth, async (req, res, next) => {
  try {
    await leaderboardController.getLeaderboard({
      httpRequest: req,
      httpResponse: res,
    });
  } catch (error) {
    next(error);
  }
}); // Get classroom leaderboard

router.get('/:cId/report', Auth, PermissionAuth, async (req, res, next) => {
  try {
    await leaderboardController.getClassroomReport({
      httpRequest: req,
      httpResponse: res,
    });
  } catch (error) {
    next(error);
  }
}); // Get classroom reports

module.exports = router;
