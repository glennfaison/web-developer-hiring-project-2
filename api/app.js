const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const HttpStatus = require('http-status-codes');
const errorHandler = require('strong-error-handler');
const components = require('./components');

/**
 *  Create new application
 *  @returns {import('express').Express}
 */
function createApplication() {
  const app = express();

  app.use(compression());

  // Configure express for CORS and request parsing
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // API routes here
  app.use('/', components);

  // Fallback route
  app.use('/', (req, res) => res.sendStatus(HttpStatus.NOT_FOUND));

  // General error handler
  app.use(errorHandler({
    debug: process.env.NODE_ENV === 'dev',
    log: true,
  }));

  return app;
}

module.exports = createApplication;
