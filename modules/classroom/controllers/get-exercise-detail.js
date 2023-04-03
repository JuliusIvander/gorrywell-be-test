module.exports = ({
  useCase,
  buildHttpResponse,
}) => async function exerciseDetail({ httpRequest, httpResponse }) {
  const { role } = httpRequest.user;
  const { eId } = httpRequest.params;
  const data = await useCase({
    userId: httpRequest.user.id,
    role,
    classroomId: httpRequest.params.id,
    exerciseId: eId,
  });

  return buildHttpResponse({
    statusCode: 200,
    success: true,
    message: 'Success',
    data,
  }, httpResponse);
};
