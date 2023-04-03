const router = require('express').Router();
const Auth = require('../middlewares/auth-middleware');
const PermissionAuth = require('../middlewares/auth-permissions');

const mentorController = require('../modules/mentor/controllers').default;

router.get('', Auth, PermissionAuth, async (req, res, next) => {
  try {
    await mentorController.getMenteeList({
      httpRequest: req,
      httpResponse: res,
    });
  } catch (error) {
    next(error);
  }
}); // Get all mentees

module.exports = router;
