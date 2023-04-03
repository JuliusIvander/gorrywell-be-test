const router = require('express').Router();

const loginController = require('../modules/account/controllers').default;

router.post('/login', async (req, res, next) => {
  try {
    await loginController.postUserLogin({
      httpRequest: req,
      httpResponse: res,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
