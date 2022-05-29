const User = require("../Models/User.model");

const validation = require("../Utility/Validation");

const registerUser = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  const { error } = validation.registerUserValidation({
    name,
    email,
    password,
    confirmPassword,
  });
  if (error) {
    return next(error.details[0]);
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return next(error);
  }
  if (existingUser) {
    return next(new Error("User already exists"));
  }

  try {
    const user = new User({ name, email, password });
    await user.save();
  } catch (error) {
    return next(error);
  }
};

const loginUser = async (req, res) => {};

module.exports = {
  register: registerUser,
  login: loginUser,
};
