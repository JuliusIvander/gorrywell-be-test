module.exports = ({
  useCase,
  buildHttpResponse,
}) => async function deleteExercise({ httpRequest, httpResponse }) {
  const { id, eId } = httpRequest.params;

  await useCase({
    classroomId: id,
    exerciseId: eId,
  });

  return buildHttpResponse({
    statusCode: 200,
    success: true,
    message: 'Success',
    data: 'Successfully Deleted!',
  }, httpResponse);
};
