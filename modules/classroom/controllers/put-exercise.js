module.exports = ({
  useCase,
  buildHttpResponse,
}) => async function putExercise({ httpRequest, httpResponse }) {
  const { user } = httpRequest;
  const { id, eId } = httpRequest.params;
  const params = httpRequest.body;

  await useCase({
    user,
    params,
    classroomId: id,
    exerciseId: eId,
  });

  return buildHttpResponse({
    statusCode: 200,
    success: true,
    message: 'Success',
    data: 'Success',
  }, httpResponse);
};
