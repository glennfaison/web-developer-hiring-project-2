const { Schema, model } = require('mongoose');

/**
 * @typedef {Object} User
 * @property {string} User.firstName
 * @property {string} User.lastName
 * @property {string} User.email
 * @property {string} [User.password]
 * @property {string} User.passwordHash
 * @property {string} User.passwordSalt
 */
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  passwordHash: {
    type: String,
    default: null,
  },
  passwordSalt: {
    type: String,
    default: null,
  },
}, { collection: 'Users' });

const UserDAO = model('Users', UserSchema);

module.exports = UserDAO;
