const crypto = require('crypto');
const { Strategy: LocalStrategy } = require('passport-local');
const expressJwt = require('express-jwt');
const { config } = require('dotenv');
const ClientDAO = require('../components/client/client.dao');

config();

/**
 * @param {string} password
 * @returns {{passwordSalt: string, passwordHash: string}}
 */
function hashPassword(password) {
  const passwordSalt = crypto.randomBytes(16).toString('hex');
  const passwordHash = crypto.pbkdf2Sync(password, passwordSalt, 10000, 512, 'sha512').toString('hex');
  return { passwordSalt, passwordHash };
}

function verifyPassword(password, client) {
  const { passwordHash, passwordSalt } = client;
  const hash = crypto.pbkdf2Sync(password, passwordSalt, 10000, 512, 'sha512').toString('hex');
  return hash === passwordHash;
}

/** @type {import('passport-local').IStrategyOptions} */
const options = {
  usernameField: 'client[email]',
  passwordField: 'client[password]',
};

/** @type {import('passport-local').VerifyFunction} */
async function verify(email, password, done) {
  try {
    const client = await ClientDAO.findOne({ email });
    if (!client) {
      return done(null, false, { error: { email: 'is incorrect' } });
    }
    if (!verifyPassword(password, client)) {
      return done(null, false, { error: { password: 'is incorrect' } });
    }
    return done(null, client);
  } catch (e) {
    return done(e);
  }
}

// Passport.js local authentication strategy (email and password auth)
const localStrategy = new LocalStrategy(options, verify);

function getTokenFromHeader(req) {
  return req.headers.authorization && req.headers.authorization.match(/Bearer (.+)/)[1];
}

localStrategy.auth = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'authInfo',
  getToken: getTokenFromHeader,
});

localStrategy.hashPassword = hashPassword;
localStrategy.verifyPassword = verifyPassword;

module.exports = localStrategy;
