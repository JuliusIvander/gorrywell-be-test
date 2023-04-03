const Validator = require('validatorjs');

module.exports = Object.freeze({
  formValidation: (params, rules) => {
    const validate = new Validator(params, rules);
    if (validate.check() === false) {
      throw new Error(JSON.stringify(validate.errors.all()));
    }
  },
});
