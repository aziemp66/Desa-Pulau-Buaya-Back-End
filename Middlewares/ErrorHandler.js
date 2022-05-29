const errorHandler = (error, req, res, next) => {
  console.log(error.message);
  res.json({
    error: error.message,
  });
};

module.exports = errorHandler;
