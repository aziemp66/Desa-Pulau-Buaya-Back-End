const bcrypt = require("bcrypt");
const emailSender = require("../Utility/NodeMailer");

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
  if (!isMatch) return next(new Error("Wrong email or password"));

  //generate token
  const token = generateUserToken({
    id: user._id,
    name: user.name,
    role: user.role,
  });

  res.json({ token, message: "Successfully Logged in" });
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  let user;
  try {
    user = await User.findOne({ email });
  } catch (err) {
    return next(err);
  }
  if (!user) return next(new Error("User not found"));

  const resetPasswordToken = resetPassword.generateLink(
    { email: user.email, password: user.password },
    `${process.env.JWT_SECRET}${user.password}`
  );
  const resetPasswordLink = `${process.env.FRONTEND_URL}/reset-password?id=${user._id}&token=${resetPasswordToken}`;

  try {
    emailSender({
      to: user.email,
      subject: "Reset Password",
      html: `<p>Click <a href="${resetPasswordLink}">here</a> to reset your password</p>`,
      text: `Click here to reset your password: ${resetPasswordLink}`,
    });
  } catch (error) {
    return next(error);
  }

  res.json({ message: "Reset Password Link has been sent to your email" });
};

const resetUserPassword = async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  const { id, token } = req.query;

  const { error } = validation.passwordChangeValidation({
    password,
    confirmPassword,
  });
  if (error) return next(error.details[0]);

  let user;
  try {
    user = await User.findOne({ id: id });
  } catch (err) {
    return next(err);
  }
  if (!user) return next(new Error("User not found"));

  let isVerified;
  try {
    isVerified = resetPassword.verifyLink(
      token,
      `${process.env.JWT_SECRET}${user.password}`
    );
  } catch (err) {
    return next(err);
  }
  if (!isVerified) return next(new Error("Link is invalid"));

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  user.password = hashedPassword;

  try {
    await user.save();
    res.json({ message: "Password changed successfully" });
  } catch (err) {
    return next(err);
  }
};

const adminLogin = async (req, res, next) => {
  const { username, password } = req.body;

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  )
    return next(new Error("Wrong identity"));

  const token = generateUserToken({
    role: "admin",
  });

  res.json({ token, message: "Successfully Logged in" });
};

module.exports = {
  register: registerUser,
  login: loginUser,
  forgotPassword: forgotPassword,
  resetPassword: resetUserPassword,
  adminLogin: adminLogin,
};
