const { MongoMemoryServer } = require('mongodb-memory-server');
const mongooseConfig = require('./mongoose');

const mongod = new MongoMemoryServer();

/**
 *  Connect to MongoDB
 *  @returns {Promise<import('mongoose').Mongoose>}
 */
async function init() {
  let mongoUri;
  try {
    mongoUri = await mongod.getConnectionString();
  } catch (e) {
    console.log('Error while connecting to MongoDB');
    console.log(e);
    process.exit(-1);
  }

  return mongooseConfig.init(mongoUri);
}

module.exports = {
  ...mongooseConfig,
  init,
};
