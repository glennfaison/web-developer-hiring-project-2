const { Schema, model } = require('mongoose');

/**
 * @typedef {Object} Insurer
 * @property {string} Insurer.companyName
 * @property {string} Insurer.email
 */
const InsurerSchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
}, { collection: 'Insurers' });

const InsurerDAO = model('Insurers', InsurerSchema);

module.exports = InsurerDAO;
