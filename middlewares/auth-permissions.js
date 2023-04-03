const { findPermissions } = require('../models/permissions');
const { buildHttpResponse } = require('../utils/response');

const normalizePath = (req) => {
  const path = req.route.path.split('/');
  const originalUrl = req.originalUrl
    .replace(/\?.*$/, '')
    .split('/');

  path.shift();
  originalUrl.shift();

  let newPath = '/';
  if (path.length === 0) {
    for (let i = 0; i < originalUrl.length; i += 1) {
      newPath += originalUrl[i];
      if (i !== originalUrl.length - 1) {
        newPath += '/';
      }
    }
  }

  const pathLen = path.length;
  originalUrl.splice(-pathLen);

  const newArray = originalUrl.concat(path);
  for (let i = 0; i < newArray.length; i += 1) {
    newPath += newArray[i];
    if (i !== newArray.length - 1) {
      newPath += '/';
    }
  }

  return newPath;
};

module.exports = async (req, res, next) => {
  try {
    const response = {
      statusCode: 401,
      success: false,
      message: 'Auth Failed',
      data: null,
    };

    const url = normalizePath(req);
    const { method } = req;
    const { role } = req.user;

    const accessor = role._id;
    const permission = await findPermissions(url, method, accessor);
    if (!permission) {
      return buildHttpResponse(response, res);
    }

    next();
  } catch (error) {
    next(error);
  }
};
