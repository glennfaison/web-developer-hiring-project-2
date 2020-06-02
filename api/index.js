const { config } = require('dotenv');
const createServer = require('./server');
const mongoose = require('./config/mongoose');

config();

async function init() {
  // Start the database before the server
  await mongoose.init();
  return createServer();
}

init().then((server) => {
  server.listen(process.env.PORT, () => {
    console.log(`Listening at http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode`);
  });
});

if (process.env.NODE_ENV === 'production') {
  // Catch any uncaught exceptions in this application
  process.on('uncaughtException', (err) => {
    console.log(`There was an uncaught exception: ${err}`);
  });

  // Catch any unhandled rejections in this application
  process.on('unhandledRejection', (err) => {
    console.log(`There was an unhandled rejection: ${err}`);
  });
}
