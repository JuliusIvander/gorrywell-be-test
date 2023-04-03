const reports = require('../reports').default;

module.exports = async (exerciseDatas, session) => {
  const datas = [];
  for (let i = 0; i < exerciseDatas.length; i += 1) {
    const classroomData = exerciseDatas[i].classroomId;
    for (let j = 0; j < classroomData.mentees.length; j += 1) {
      const data = {
        classroomId: classroomData.id,
        exerciseId: exerciseDatas[i].id,
      };
      data.menteeId = classroomData.mentees[j];
      datas.push(data);
    }
  }

  await reports.insertMany(datas, { session });
  console.log('Seeding Report Data Success!');
};
