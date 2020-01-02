const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const userCtrl = require('../controllers/user');

router.get('/secret', userCtrl.authMiddleware, (req, res) => {
    res.json({"secret": true});
})

router.get('', (req, res) => {
    Rental.find({})
        .select('-bookings')
        .exec(function(err, rentals) {
            if(err){
                return res.status(422).send({errors: 
                    [{title: 'Rental Error!', detail: 'Cound not find Rental'}]
                })
            }
            res.json(rentals);
        })
});
router.get('/:id', (req, res) => {

    Rental.findById(req.params.id)
        .populate('user', 'username -_id')
        .populate('bookings', 'startAt endAt -_id')
        .exec(function(err, foundRental) {
            if(err){
                return res.status(422).send({errors: 
                    [{title: 'Rental Error!', detail: 'Cound not find Rental'}]
                })
            }
            res.json(foundRental);
        })
});

module.exports = router;