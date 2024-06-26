const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { MSG_USERNAME_EXISTS, MSG_INVALID_CREDENTIALS } = require('../constants/httpStatus');

async function register(username, password) {
  try {
    let user = await User.findOne({ username });

    if (user) {
      throw new Error(MSG_USERNAME_EXISTS);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
}

async function login(username, password) {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error(MSG_INVALID_CREDENTIALS);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error(MSG_INVALID_CREDENTIALS);
    }

    return user;
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  register,
  login,
};
