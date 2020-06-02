const createServer = require('./server');
const { config } = require('dotenv');

config();

createServer().listen(process.env.PORT, () => {
  console.log(`Listening at http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode`);
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
