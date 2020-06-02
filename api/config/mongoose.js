const mongoose = require('mongoose');
const { config } = require('dotenv');

config();

/** @type {import('mongoose')} */
let mongooseConnection;
let oldMongoUri;

/**
 *  Connect to MongoDB
 *  @returns {Promise<import('mongoose')>}
 */
async function init(mongoUri = process.env.MONGO_URI) {
  if (!mongoUri) {
    console.log('MONGO_URI environment variable has not been set');
    process.exit(1);
  }
  if (mongooseConnection && oldMongoUri === mongoUri) { return mongooseConnection; }

  try {
    /** @type {import('mongoose').ConnectionOptions} */
    const mongooseOptions = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    };

    mongooseConnection = await mongoose.connect(mongoUri, mongooseOptions);
  } catch (e) {
    console.log('Error while connecting to MongoDB');
    console.log(e);
    process.exit(-1);
  }

  if (process.env.NODE_ENV === 'development') {
    mongooseConnection.set('debug', true);
  }

  return mongooseConnection;
}

async function clearDb() {
  const collections = Object.keys(mongoose.connection);
  collections.forEach(async (key) => {
    const collection = mongoose.connection.collections[key];
    await collection.deleteMany();
  });
}

async function closeConnection() {
  await mongoose.disconnect();
}

module.exports = { init, clearDb, closeConnection };
