const express = require('express');
const router = express.Router({ mergeParams: true });

router.use('/upload', require('./upload'));

module.exports = router;
