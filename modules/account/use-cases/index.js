const user = require('../../../models/users');

const { validatePassword, generateToken } = require('../../../middlewares/auth');
const { formValidation } = require('../../../utils/validation');

const makeLogin = require('./login');

const login = makeLogin({
  user,
  formValidation,
  validatePassword,
  generateToken,
});

const accountService = Object.freeze({
  login,
});

module.exports = {
  default: accountService,
  ...accountService,
};
