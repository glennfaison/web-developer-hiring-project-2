const faker = require('faker');
const ClientDAO = require('./client.dao');
const { hashPassword } = require('../../strategies/local');

async function generateOne() {
  /** @type {Client} */
  const client = {};
  const gender = faker.random.boolean() ? 1 : 0;
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);
  client.fullName = `${firstName} ${lastName}`;
  client.email = faker.internet.email(firstName, lastName);
  client.password = faker.internet.password();
  const { passwordHash, passwordSalt } = hashPassword(client.password);
  client.passwordHash = passwordHash;
  client.passwordSalt = passwordSalt;
  return client;
}

/** @returns {Promise<Client[]>} */
async function generate(count = 1) {
  const promises = new Array(count).fill()
    .map(() => generateOne());
  let clients = await Promise.allSettled(promises);
  clients = clients
    .filter((u) => u.status === 'fulfilled')
    .map((u) => u.value);
  return clients;
}

/** @returns {Promise<ClientDAO[]>} */
async function generateAndSave(count = 1) {
  const clients = await generate(count);
  const promises = clients.map((u) => ClientDAO.create(u));
  /** @type {ClientDAO[]} */
  let savedClients = await Promise.allSettled(promises);
  savedClients = savedClients
    .filter((u) => u.status === 'fulfilled')
    .map((u, i) => ({ ...u.value.toJSON(), password: clients[i].password }));
  return savedClients;
}

module.exports = {
  generate,
  generateAndSave,
};

/** @typedef {import('./client.dao')} ClientDAO */
/** @typedef {import('./client.dao').Client} Client */
