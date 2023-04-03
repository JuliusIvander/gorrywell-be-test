const { faker } = require('@faker-js/faker');
const exercises = require('../exercises').default;

module.exports = async (classroomData, session) => {
  const datas = [];
  for (let i = 0; i < classroomData.length; i += 1) {
    const n = Math.floor(Math.random() * 5) + 1;
    for (let j = 1; j <= n; j += 1) {
      datas.push({
        classroomId: classroomData[i].id,
        exerciseName: faker.commerce.productName(),
        exerciseDescription: faker.commerce.productDescription(),
        submittedBefore: faker.date.soon(4),
      });
    }
  }

  await exercises.insertMany(datas, { session });
  console.log('Seeding Exercise Data Success!');
};
