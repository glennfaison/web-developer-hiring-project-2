const { Router } = require('express');
const pingRoutes = require('./ping/ping.route');
const userRoutes = require('./user/user.route');

const router = Router();
const baseApi = '/api/v1';

router.use(baseApi, pingRoutes);
router.use(baseApi, userRoutes);

module.exports = router;
