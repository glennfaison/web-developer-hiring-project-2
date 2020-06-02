const { Router } = require('express');
const HttpStatus = require('http-status-codes');
const UserDAO = require('./user.dao');

const router = Router();

router.get('/users', async (req, res, next) => {
  try {
    const data = await UserDAO.find(req.query);
    return res.status(HttpStatus.OK).json({ data });
  } catch (e) {
    return next(e);
  }
});

router.get('/users/:id', async (req, res, next) => {
  try {
    const data = await UserDAO.findById(req.params.id);
    if (!data) { return res.sendStatus(HttpStatus.NOT_FOUND); }
    return res.status(HttpStatus.OK).json({ data });
  } catch (e) {
    return next(e);
  }
});

router.put('/users/:id', async (req, res, next) => {
  try {
    const data = await UserDAO.findByIdAndUpdate(req.params.id, req.body.user, { new: true });
    if (!data) {
      return res.sendStatus(HttpStatus.NOT_FOUND);
    }
    return res.status(HttpStatus.OK).json({ data });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
