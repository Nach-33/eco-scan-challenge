const express = require('express');
const router = express.Router({ mergeParams: true });

router.use('/auth', require('./auth'));

module.exports = router;
