const verifyRoles = (role, req, res, next) => {
  const user = req.user;

  if (role.includes(user.role)) {
    next();
  } else {
    res.json({
      error: `User is not verified - Access denied`,
    });
  }
};

module.exports = verifyRoles;
