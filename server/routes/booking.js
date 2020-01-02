const express = require('express');
const router = express.Router();
const bookingCtrl = require('../controllers/booking');
const userCtrl = require('../controllers/user');
router.post('', userCtrl.authMiddleware, bookingCtrl.createBooking);

module.exports = router;