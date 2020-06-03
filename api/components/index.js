const { Router } = require('express');
const pingRoutes = require('./ping/ping.route');
const clientRoutes = require('./client/client.route');

const router = Router();
const baseApi = '/api/v1';

router.use(baseApi, pingRoutes);
router.use(baseApi, clientRoutes);

module.exports = router;
