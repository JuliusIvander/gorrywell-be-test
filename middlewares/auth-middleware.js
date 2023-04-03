const { findOneByUsername } = require('../models/users');
const { buildHttpResponse } = require('../utils/response');
const Auth = require('./auth');

module.exports = async (req, res, next) => {
  try {
    const response = {
      statusCode: 401,
      success: false,
      message: 'Auth Failed',
      data: null,
    };
    if (!req.headers.authorization) {
      return buildHttpResponse(response, res);
    }
    const token = req.headers.authorization.split(' ')[1];
    const decoded = Auth.validateToken(token);

    if (!decoded) {
      return buildHttpResponse(response, res);
    }

    const { username } = decoded.data;
    const userData = await findOneByUsername(username);
    if (!userData) {
      return buildHttpResponse(response, res);
    }

    req.user = userData;
    next();
  } catch (error) {
    next(error);
  }
};
