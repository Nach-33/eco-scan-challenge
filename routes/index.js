const express = require('express');
const router = express.Router();

router.use('/user', require('./user'));
router.use('/transaction', require('./transaction'));
router.use('/reward', require('./reward'));


module.exports = router;
