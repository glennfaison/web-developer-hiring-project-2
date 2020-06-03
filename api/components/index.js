const { Router } = require('express');
const pingRoutes = require('./ping/ping.route');
const clientRoutes = require('./client/client.route');
const insurerRoutes = require('./insurer/insurer.route');

const router = Router();
const baseApi = '/api/v1';

router.use(baseApi, pingRoutes);
router.use(baseApi, clientRoutes);
router.use(baseApi, insurerRoutes);

module.exports = router;
