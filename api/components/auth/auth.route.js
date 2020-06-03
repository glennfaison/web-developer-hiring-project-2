const { Router } = require('express');
const HttpStatus = require('http-status-codes');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const ClientDAO = require('../client/client.dao');
const { hashPassword } = require('../../strategies/local');

const router = Router();

/**
 * @param {import('../client/client.dao').Client} client
 * @returns {string}
 */
function generateJWT(client) {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    ...client,
    exp: Number.parseInt(exp.getTime() / 1000, 10),
  }, process.env.JWT_SECRET);
}

// Registration
router.post('/auth/register', async (req, res) => {
  const { email, password, ...otherKeys } = req.body.client;
  if (!email) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ error: { email: 'is required!' } });
  }
  if (!password) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ error: { password: 'is required!' } });
  }
  const client = { email, ...otherKeys, ...hashPassword(password) };

  let result;
  try {
    result = await ClientDAO.create(client);
  } catch (e) {
    return res.status(HttpStatus.BAD_REQUEST).json({ error: e });
  }
  return res.status(HttpStatus.CREATED).json({ data: result });
});

// Login
router.put('/auth/login', async (req, res, next) => {
  const { email, password } = req.body.client;
  if (!email) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ error: { email: 'is required!' } });
  }
  if (!password) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ error: { password: 'is required!' } });
  }

  return passport.authenticate('local', { session: false }, (err, client, info) => {
    if (err) {
      return next(err);
    }
    if (!client) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ error: info });
    }
    const authToken = generateJWT(client);
    return res.status(HttpStatus.OK).json({ data: { client, authToken } });
  })(req, res, next);
});

module.exports = router;
