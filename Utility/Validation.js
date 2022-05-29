const Joi = require("joi");

const registerUserValidation = (data) => {
  const schema = {
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    confirmPassword: Joi.ref("password"),
  };
  return Joi.validate(data, schema);
};

module.exports = {
  registerUserValidation,
};
