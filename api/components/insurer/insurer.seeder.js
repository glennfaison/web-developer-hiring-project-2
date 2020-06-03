const faker = require('faker');
const InsurerDAO = require('./insurer.dao');

async function generateOne() {
  /** @type {Insurer} */
  const insurer = {};
  insurer.companyName = faker.company.companyName();
  insurer.email = faker.internet.email(insurer.companyName);
  return insurer;
}

/** @returns {Promise<Insurer[]>} */
async function generate(count = 1) {
  const promises = new Array(count).fill()
    .map(() => generateOne());
  let insurers = await Promise.allSettled(promises);
  insurers = insurers
    .filter((u) => u.status === 'fulfilled')
    .map((u) => u.value);
  return insurers;
}

/** @returns {Promise<InsurerDAO[]>} */
async function generateAndSave(count = 1) {
  const insurers = await generate(count);
  const promises = insurers.map((u) => InsurerDAO.create(u));
  /** @type {InsurerDAO[]} */
  let savedInsurers = await Promise.allSettled(promises);
  savedInsurers = savedInsurers
    .filter((u) => u.status === 'fulfilled')
    .map((u) => u.value);
  return savedInsurers;
}

module.exports = {
  generate,
  generateAndSave,
};

/** @typedef {import('./insurer.dao')} InsurerDAO */
/** @typedef {import('./insurer.dao').Insurer} Insurer */
