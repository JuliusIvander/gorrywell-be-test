module.exports = ({
  useCase,
  buildHttpResponse,
}) => async function userLogin({ httpRequest, httpResponse }) {
  const { username, password } = httpRequest.body;

  const userCredential = await useCase({
    username,
    password,
  });

  return buildHttpResponse({
    statusCode: 200,
    success: true,
    message: 'Success',
    data: userCredential,
  }, httpResponse);
};
