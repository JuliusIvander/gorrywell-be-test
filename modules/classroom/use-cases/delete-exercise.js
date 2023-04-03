module.exports = ({
  exercises,
  reports,
}) => async function deleteExercise({ classroomId, exerciseId }) {
  await reports.deleteReports(classroomId, exerciseId);
  await exercises.deleteExercise(classroomId, exerciseId);
};
