module.exports = ({
  user,
  formValidation,
  validatePassword,
  generateToken,
}) => async function userLogin({ username, password }) {
  const rules = {
    username: 'required|string',
    password: 'required|string',
  };
  formValidation({ username, password }, rules);

  const userData = await user.findOneByUsername(username);
  if (!userData) {
    throw new Error('Invalid username or password!');
  }

  const isPasswordValid = validatePassword(password, userData.password);
  if (!isPasswordValid) {
    throw new Error('Invalid username or password');
  }

  const token = generateToken({
    username: userData.username,
    roleId: userData.role.id,
    role: userData.role.roleName,
  });

  return { token };
};
