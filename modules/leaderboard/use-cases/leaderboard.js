module.exports = ({
  reports,
}) => async function classroomLeaderboard({ classroomId }) {
  const datas = await reports.getClassroomLeaderboard(classroomId);

  const formattedData = datas.map((data) => {
    const formatted = {
      menteeId: data._id._id,
      menteeName: data._id.name,
      avgScore: data.avgScore,
    };
    return formatted;
  });
  return formattedData;
};
