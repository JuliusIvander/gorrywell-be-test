const mongoose = require('mongoose');

const Roles = mongoose.model('roles', {
  roleName: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = Object.freeze({
  default: Roles,
  createRole: async (role) => {
    const data = new Roles(role);
    await data.save();
  },
  createManyRoles: async (roles) => {
    await Roles.insertMany(roles);
  },
  getAllRoles: async () => {
    const data = await Roles.find();
    return data;
  },
});
