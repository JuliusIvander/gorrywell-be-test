const permissions = require('../permissions').default;

module.exports = async (roleList, session) => {
  const extractedRole = {};
  roleList.forEach((role) => {
    extractedRole[role.roleName] = role._id;
  });

  const datas = [
    {
      url: '/v1/mentor',
      method: 'GET',
      accessors: [extractedRole.Mentor],
    },
    {
      url: '/v1/leaderboard/:cId',
      method: 'GET',
      accessors: [
        extractedRole.Mentor,
        extractedRole.Mentee,
        extractedRole.Normal,
      ],
    },
    {
      url: '/v1/leaderboard/:cId/report',
      method: 'GET',
      accessors: [
        extractedRole.Mentor,
        extractedRole.Mentee,
        extractedRole.Normal,
      ],
    },
    {
      url: '/v1/classroom',
      method: 'GET',
      accessors: [
        extractedRole.Mentor,
        extractedRole.Mentee,
      ],
    },
    {
      url: '/v1/classroom/:id',
      method: 'GET',
      accessors: [
        extractedRole.Mentor,
        extractedRole.Mentee,
      ],
    },
    {
      url: '/v1/classroom/:id/exercises/:eId',
      method: 'GET',
      accessors: [
        extractedRole.Mentor,
        extractedRole.Mentee,
      ],
    },
    {
      url: '/v1/classroom/:id/exercises/:eId',
      method: 'PUT',
      accessors: [
        extractedRole.Mentor,
        extractedRole.Mentee,
      ],
    },
    {
      url: '/v1/classroom/:id/exercises/:eId',
      method: 'DELETE',
      accessors: [extractedRole.Mentor],
    },
  ];

  await permissions.insertMany(datas, { session });
};
