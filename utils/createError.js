const createError = (code, message) => {
  // code body
  const error = new Error(message);
  error.statusCode = code;

  throw error;
};

module.exports = createError;
