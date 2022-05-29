const bcrypt = require("bcrypt");

const User = require("../Models/User.model");

const validation = require("../Utility/Validation");
const generateUserToken = require("../Utility/GenerateToken");

const registerUser = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  const { error } = validation.registerValidation({
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

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.json({ message: "User created successfully" });
  } catch (error) {
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const { error } = validation.loginValidation({ email, password });
  if (error) {
    return next(error.details[0]);
  }

  let user;
  try {
    user = await User.findOne({ email });
  } catch (error) {
    return next(error);
  }
  if (!user) {
    return next(new Error("Wrong email or password"));
  }

  //compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new Error("Wrong email or password"));
  }

  //generate token
  const token = generateUserToken({
    id: user._id,
    name: user.name,
    role: user.role,
  });

  res.json({ token, message: "Successfully Logged in" });
};

module.exports = {
  register: registerUser,
  login: loginUser,
};
