const faker = require('faker');
const PremiumDAO = require('./premium.dao');
const InsurerDAO = require('../insurer/insurer.dao');

async function generateOne() {
  // Fetch the id of a random company
  const companies = await InsurerDAO.find({});
  if (companies.length === 0) {
    throw new Error('Cannot generate premiums without pre-existing Insurers');
  }
  const insurer = faker.random.arrayElement(companies);
  /** @type {Premium} */
  const premium = {};
  premium.companyId = insurer._id.toString();
  premium.category = faker.commerce.department();
  premium.description = faker.lorem.sentences(2);
  premium.name = faker.random.words(2);
  const paymentTypes = ['FIXED', 'WEEKLY', 'MONTHLY', 'YEARLY'];
  premium.paymentType = faker.random.arrayElement(paymentTypes);
  premium.paymentAmount = faker.random.number({ min: 100, precision: 2, max: 10000000 });
  const dateMS = faker.random.number({
    min: new Date('2018-01-01').getTime(),
    max: Date.now() - (1000 * 60 * 60 * 24),
  });
  premium.dateCreated = new Date(dateMS);
  premium.currency = faker.finance.currencyCode();
  return premium;
}

/** @returns {Promise<Premium[]>} */
async function generate(count = 1) {
  const promises = new Array(count).fill()
    .map(() => generateOne());
  let premiums = await Promise.allSettled(promises);
  premiums = premiums
    .filter((u) => u.status === 'fulfilled')
    .map((u) => u.value);
  return premiums;
}

/** @returns {Promise<PremiumDAO[]>} */
async function generateAndSave(count = 1) {
  const premiums = await generate(count);
  const promises = premiums.map((u) => PremiumDAO.create(u));
  /** @type {PremiumDAO[]} */
  let savedPremiums = await Promise.allSettled(promises);
  savedPremiums = savedPremiums
    .filter((u) => u.status === 'fulfilled')
    .map((u) => u.value);
  return savedPremiums;
}

module.exports = {
  generate,
  generateAndSave,
};

/** @typedef {import('./premium.dao')} PremiumDAO */
/** @typedef {import('./premium.dao').Premium} Premium */
