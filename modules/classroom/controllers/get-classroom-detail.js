module.exports = ({
  useCase,
  buildHttpResponse,
}) => async function exerciseList({ httpRequest, httpResponse }) {
  const { id } = httpRequest.params;
  const data = await useCase({ classroomId: id });

  return buildHttpResponse({
    statusCode: 200,
    success: true,
    message: 'Success',
    data,
  }, httpResponse);
};
