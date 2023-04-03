module.exports = ({
  useCase,
  buildHttpResponse,
}) => async function classLeaderboard({ httpRequest, httpResponse }) {
  const { cId } = httpRequest.params;
  const data = await useCase({ classroomId: cId });

  return buildHttpResponse({
    statusCode: 200,
    success: true,
    message: 'Success',
    data,
  }, httpResponse);
};
