const Roles = require('../roles').default;

module.exports = async (session) => {
  const data = [
    { roleName: 'Mentor' },
    { roleName: 'Mentee' },
    { roleName: 'Normal' },
  ];

  await Roles.insertMany(data, { session });

  console.log('Seeding Role Data Success!');
};
