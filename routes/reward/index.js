const express = require('express');
const router = express.Router({ mergeParams: true });

router.use('/items', require('./items'));
router.use('/redeem', require('./redeem'));

module.exports = router;