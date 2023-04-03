module.exports = ({
  useCase,
  buildHttpResponse,
}) => async function menteeList({ httpRequest, httpResponse }) {
  const { id } = httpRequest.user;
  const data = await useCase({ mentorId: id, params: httpRequest.query });

  return buildHttpResponse({
    statusCode: 200,
    success: true,
    message: 'Success',
    data,
  }, httpResponse);
};
