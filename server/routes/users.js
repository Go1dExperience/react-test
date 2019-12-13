const express = require('express');
const User = require('../controllers/user');
const router = express.Router();



// Post to Authenticate
router.post('/auth', User.auth);
// Post to register
router.post('/register', User.register);

module.exports = router;