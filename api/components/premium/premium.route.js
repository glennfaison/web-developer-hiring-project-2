const { Router } = require('express');
const HttpStatus = require('http-status-codes');
const PremiumDAO = require('./premium.dao');

const router = Router();

router.get('/premiums', async (req, res, next) => {
  try {
    const data = await PremiumDAO.find(req.query);
    return res.status(HttpStatus.OK).json({ data });
  } catch (e) {
    return next(e);
  }
});

router.get('/premiums/:id', async (req, res, next) => {
  try {
    const data = await PremiumDAO.findById(req.params.id);
    if (!data) { return res.sendStatus(HttpStatus.NOT_FOUND); }
    return res.status(HttpStatus.OK).json({ data });
  } catch (e) {
    return next(e);
  }
});

router.put('/premiums/:id', async (req, res, next) => {
  try {
    const data = await PremiumDAO.findByIdAndUpdate(req.params.id, req.body.premium, { new: true });
    if (!data) {
      return res.sendStatus(HttpStatus.NOT_FOUND);
    }
    return res.status(HttpStatus.OK).json({ data });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
