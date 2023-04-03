const useCase = require('../use-cases').default;

const { buildHttpResponse } = require('../../../utils/response');

const makeUserLogin = require('./post-user-login');

const postUserLogin = makeUserLogin({
  useCase: useCase.login,
  buildHttpResponse,
});

const accountController = Object.freeze({
  postUserLogin,
});

module.exports = {
  default: accountController,
  ...accountController,
};
