const { faker } = require('@faker-js/faker');
const Classrooms = require('../classrooms').default;

const getRandomMenteeData = (menteeList) => {
  const len = menteeList.length;
  let n = Math.floor(Math.random() * 15) + 1;
  const datas = [];
  const takenIdx = [];

  while (n > 0) {
    const idx = Math.floor(Math.random() * len);
    if (!takenIdx.includes(idx)) {
      takenIdx.push(idx);
      datas.push(menteeList[idx]._id);
      n -= 1;
    }
  }
  return datas;
};

module.exports = async (mentorData, menteeData, session) => {
  const datas = [];
  for (let i = 1; i <= 5; i += 1) {
    const selectedMentorIdx = Math.floor(Math.random() * mentorData.length);
    const selectedMenteeData = getRandomMenteeData(menteeData);
    datas.push({
      className: faker.random.words(),
      classDescription: faker.lorem.paragraph(),
      mentor: mentorData[selectedMentorIdx]._id,
      mentees: selectedMenteeData,
    });
  }

  await Classrooms.insertMany(datas, { session });
  console.log('Seeding Classroom Data Success!');
};
