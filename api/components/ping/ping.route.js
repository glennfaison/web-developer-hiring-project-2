const HttpStatus = require('http-status-codes');
const { Router } = require('express');

const router = Router();

router.get('/ping', (req, res) => res.status(HttpStatus.OK).end('pong'));

module.exports = router;
