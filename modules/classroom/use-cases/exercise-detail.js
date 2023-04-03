module.exports = ({
  reports,
}) => async function exerciseDetail({
  userId,
  role,
  classroomId,
  exerciseId,
}) {
  let datas = [];
  let formattedData;
  switch (role.roleName) {
    case 'Mentor':
      datas = await reports.getReportsByExercise(classroomId, exerciseId);
      if (datas.length === 0) {
        formattedData = [];
      } else {
        formattedData = {
          ...datas[0]._id,
          mentees: datas[0].mentees.map((mentee) => {
            const formatted = {
              menteeId: mentee.menteeData._id,
              menteeName: mentee.menteeData.name,
              latestStatus: mentee.latestStatus,
              answers: mentee.answers,
              remarks: mentee.remarks,
              submittedAt: mentee.submittedAt,
            };
            return formatted;
          }),
        };
      }
      break;
    case 'Mentee':
      datas = await reports.getReportsByExerciseAndMentee(classroomId, exerciseId, userId);
      if (datas.length === 0) {
        formattedData = [];
      } else {
        formattedData = {
          _id: datas.exerciseId.id,
          exerciseName: datas.exerciseId.exerciseName,
          exerciseDescription: datas.exerciseId.exerciseDescription,
          submittedBefore: datas.exerciseId.submittedBefore,
          latestStatus: datas.latestStatus,
          answers: datas.answers,
          remarks: datas.remarks,
          submittedAt: datas.submittedAt,
        };
      }
      break;
    default:
      throw new Error('Unauthorize Role Accessing Process!');
  }

  return formattedData;
};
