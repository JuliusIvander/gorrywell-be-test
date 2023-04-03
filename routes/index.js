const router = require('express').Router();

const mentorRouter = require('./mentor');
const leaderboardRouter = require('./leaderboard');
const classroomRouter = require('./classroom');
const accountRouter = require('./account');

router.use('/account', accountRouter);
router.use('/mentor', mentorRouter);
router.use('/leaderboard', leaderboardRouter);
router.use('/classroom', classroomRouter);

module.exports = router;
