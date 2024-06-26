const {
    MSG_INVALID_USERNAME,
    MSG_INVALID_PASSWORD,
  } = require('../constants/httpStatus');
  
  function validateUserInput(username, password) {
    const errors = [];
  
    if (!isValidUsername(username)) {
      errors.push(MSG_INVALID_USERNAME);
    }
  
    if (!isValidPassword(password)) {
      errors.push(MSG_INVALID_PASSWORD);
    }
  
    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }
  }
  
  function isValidUsername(username) {
    // Example validation: Username must be at least 3 characters long you can add your server side validation conditions here
    return username.length >= 3;
  }
  
  function isValidPassword(password) {
    // Example validation: Password must be at least 6 characters long
    return password.length >= 6;
  }
  
  module.exports = {
    validateUserInput,
  };
  