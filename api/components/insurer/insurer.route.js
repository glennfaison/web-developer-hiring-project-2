const { Router } = require('express');
const HttpStatus = require('http-status-codes');
const InsurerDAO = require('./insurer.dao');

const router = Router();

router.get('/insurers', async (req, res, next) => {
  try {
    const data = await InsurerDAO.find(req.query);
    return res.status(HttpStatus.OK).json({ data });
  } catch (e) {
    return next(e);
  }
});

router.get('/insurers/:id', async (req, res, next) => {
  try {
    const data = await InsurerDAO.findById(req.params.id);
    if (!data) { return res.sendStatus(HttpStatus.NOT_FOUND); }
    return res.status(HttpStatus.OK).json({ data });
  } catch (e) {
    return next(e);
  }
});

router.put('/insurers/:id', async (req, res, next) => {
  try {
    const data = await InsurerDAO.findByIdAndUpdate(req.params.id, req.body.insurer, { new: true });
    if (!data) {
      return res.sendStatus(HttpStatus.NOT_FOUND);
    }
    return res.status(HttpStatus.OK).json({ data });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
