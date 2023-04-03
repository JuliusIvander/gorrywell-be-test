module.exports = ({
  exercises,
}) => async function classroomDetail({ classroomId }) {
  const data = await exercises.getExerciseByClassroomId(classroomId);
  const classroomData = data[0]._id;
  const exerciseList = data[0].exercises;

  const formattedData = {
    ...classroomData,
    exercises: exerciseList,
  };

  return formattedData;
};
