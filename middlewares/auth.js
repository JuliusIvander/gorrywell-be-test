const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = Object.freeze({
  generateToken: (data) => jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      data,
    },
    process.env.TOKEN_SECRET || 'g0RryW377tE5T',
  ),
  validateToken: (token) => jwt.verify(token, process.env.TOKEN_SECRET || 'g0RryW377tE5T'),
  hashingPassword: async (plainText) => {
    const generatedSalt = await bcrypt.genSalt(process.env.SALT_ROUND || 10);
    const hashedPassword = await bcrypt.hash(plainText, generatedSalt);

    return hashedPassword;
  },
  validatePassword: (plainText, hash) => bcrypt.compareSync(plainText, hash),
});
