module.exports = ({
  useCase,
  buildHttpResponse,
}) => async function classroomList({ httpRequest, httpResponse }) {
  const { id, role } = httpRequest.user;
  const data = await useCase({ userId: id, role, params: httpRequest.query });

  return buildHttpResponse({
    statusCode: 200,
    success: true,
    message: 'Success',
    data,
  }, httpResponse);
};
