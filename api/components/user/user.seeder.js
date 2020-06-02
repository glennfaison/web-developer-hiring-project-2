const faker = require('faker');
const UserDAO = require('./user.dao');

async function generateOne() {
  /** @type {User} */
  const user = {};
  const gender = faker.random.boolean() ? 1 : 0;
  user.firstName = faker.name.firstName(gender);
  user.lastName = faker.name.lastName(gender);
  user.email = faker.internet.email(user.firstName, user.lastName);
  user.password = faker.internet.password();
  return user;
}

/** @returns {Promise<User[]>} */
async function generate(count = 1) {
  const promises = new Array(count).fill()
    .map(() => generateOne());
  let users = await Promise.allSettled(promises);
  users = users
    .filter((u) => u.status === 'fulfilled')
    .map((u) => u.value);
  return users;
}

/** @returns {Promise<UserDAO[]>} */
async function generateAndSave(count = 1) {
  const users = await generate(count);
  const promises = users.map((u) => UserDAO.create(u));
  /** @type {UserDAO[]} */
  let savedUsers = await Promise.allSettled(promises);
  savedUsers = savedUsers
    .filter((u) => u.status === 'fulfilled')
    .map((u) => u.value);
  return savedUsers;
}

module.exports = {
  generate,
  generateAndSave,
};

/** @typedef {import('./user.dao')} UserDAO */
/** @typedef {import('./user.dao').User} User */
