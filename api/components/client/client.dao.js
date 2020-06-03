const { Schema, model } = require('mongoose');

/**
 * @typedef {Object} Client
 * @property {string} Client.fullName
 * @property {string} Client.email
 * @property {string} [Client.password]
 * @property {string} Client.passwordHash
 * @property {string} Client.passwordSalt
 */
const ClientSchema = new Schema({
  fullName: {
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
}, { collection: 'Clients' });

const ClientDAO = model('Clients', ClientSchema);

module.exports = ClientDAO;
