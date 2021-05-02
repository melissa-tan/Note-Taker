const router = require('express').Router();

const noteRoute = require('./noteRoute');

router.use('/notes', noteRoute);

module.exports = router;