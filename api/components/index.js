const { Router } = require('express');
const pingRoutes = require('./ping/ping.route');

const router = Router();
const baseApi = '/api/v1';

router.use(baseApi, pingRoutes);

module.exports = router;
