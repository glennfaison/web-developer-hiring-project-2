const { Schema, model } = require('mongoose');

/**
 * @typedef {Object} Premium
 * @property {string} Premium.companyId
 * @property {string} Premium.name
 * @property {string} Premium.category
 * @property {string} Premium.description
 * @property {'FIXED'|'WEEKLY'|'MONTHLY'|'YEARLY'} Premium.paymentType
 * @property {number} Premium.paymentAmount
 * @property {Date} Premium.dateCreated
 * @property {string} Premium.currency
 */
const PremiumSchema = new Schema({
  companyId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  paymentType: {
    type: String,
    enum: ['FIXED', 'WEEKLY', 'MONTHLY', 'YEARLY'],
  },
  paymentAmount: {
    type: Schema.Types.Decimal128,
  },
  dateCreated: {
    type: Date,
  },
  currency: {
    type: String,
  },
}, { collection: 'Premiums' });

const PremiumDAO = model('Premiums', PremiumSchema);

module.exports = PremiumDAO;
