const { Router } = require('express');
const HttpStatus = require('http-status-codes');
const ClientDAO = require('./client.dao');

const router = Router();

router.get('/clients', async (req, res, next) => {
  try {
    const data = await ClientDAO.find(req.query);
    return res.status(HttpStatus.OK).json({ data });
  } catch (e) {
    return next(e);
  }
});

router.get('/clients/:id', async (req, res, next) => {
  try {
    const data = await ClientDAO.findById(req.params.id);
    if (!data) { return res.sendStatus(HttpStatus.NOT_FOUND); }
    return res.status(HttpStatus.OK).json({ data });
  } catch (e) {
    return next(e);
  }
});

router.put('/clients/:id', async (req, res, next) => {
  try {
    const data = await ClientDAO.findByIdAndUpdate(req.params.id, req.body.client, { new: true });
    if (!data) {
      return res.sendStatus(HttpStatus.NOT_FOUND);
    }
    return res.status(HttpStatus.OK).json({ data });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
