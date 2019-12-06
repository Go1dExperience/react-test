const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');

router.get('', (req, res) => {
    Rental.find({}, (err, rentals) => {
        res.json(rentals);
    })
});
router.get('/:id', (req, res) => {
    Rental.findById(req.params.id)
    .then(rental => res.json(rental))
    .catch(err => 
        res.status(422).send({errors: 
            [{title: 'Rental Error!',
            detail: 'Cound not find Rental'
        }]
    }));
});

module.exports = router;