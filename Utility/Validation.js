const Joi = require("joi");

const registerUserValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
      .required(),
    confirmPassword: Joi.ref("password"),
  });
  return schema.validate(data);
};

const loginUserValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
      .required(),
  });
  return schema.validate(data);
};

const productPostValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    price: Joi.number().required(),
    description: Joi.string().min(3).max(5000).required(),
    images: Joi.array().optional(),
    tags: Joi.array().min(1).required(),
  });
  return schema.validate(data);
};

module.exports = {
  registerValidation: registerUserValidation,
  loginValidation: loginUserValidation,
  productPostValidation: productPostValidation,
};
