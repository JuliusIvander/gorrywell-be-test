const mongoose = require('mongoose');
const roles = require('./roles').default;

const Users = mongoose.model('users', {
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: roles,
    required: true,
  },
});

module.exports = Object.freeze({
  default: Users,
  findOneByUsername: async (username) => {
    const data = await Users.findOne({ username }).populate('role').exec();
    return data;
  },
});
