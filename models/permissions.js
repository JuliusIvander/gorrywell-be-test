const mongoose = require('mongoose');
const roles = require('./roles').default;

const Permissions = mongoose.model('permissions', {
  url: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
    enum: ['POST', 'PUT', 'GET', 'DELETE'],
  },
  accessors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: roles,
  }],
});

module.exports = Object.freeze({
  default: Permissions,
  findPermissions: async (url, method, accessor) => {
    const data = await Permissions
      .findOne({
        url,
        method,
        accessors: {
          $in: accessor,
        },
      })
      .exec();
    return data;
  },
});
