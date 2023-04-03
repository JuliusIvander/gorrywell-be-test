const { faker } = require('@faker-js/faker');
const { hashingPassword } = require('../../middlewares/auth');
const Users = require('../users').default;

module.exports = async (roleList, session) => {
  const password = 'SuperIdol123';
  const hashedPassword = await hashingPassword(password);

  // Creating users
  const datas = [];
  for (let i = 0; i < roleList.length; i += 1) {
    let n;
    switch (roleList[i].roleName) {
      case 'Mentor':
      case 'Normal':
        n = 3;
        break;
      case 'Mentee':
        n = 25;
        break;
      default:
        n = 0;
    }
    for (let j = 1; j <= n; j += 1) {
      datas.push({
        name: faker.name.fullName(),
        username: faker.internet.userName(),
        password: hashedPassword,
        role: roleList[i].id,
      });
    }
  }

  await Users.insertMany(datas, { session });
  console.log('Seeding User Data Success!');
};
