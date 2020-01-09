const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const User = require('../models/user');
const userCtrl = require('../controllers/user');
const {normalizeErrors} = require('../helpers/mongoose')

router.get('/secret', userCtrl.authMiddleware, (req, res) => {
    res.json({"secret": true});
});
// Find Rental
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
// Find Rentals
router.get('', (req, res) => {
    const city = req.query.city;
    const query = city ? {city: city.toLowerCase()} : {}
    
        Rental.find(query)
        .select('-bookings')
        .exec(function(err, rentals) {
            if(err){
                return res.status(422).send({errors: normalizeErrors(err.errors)})
            }
            if(city && rentals.length === 0){
                return res.status(422).send({errors: 
                    [{title: 'No Rentals Found!', detail: `There are no rentals in ${city}`}]
                })
            }
            return res.json(rentals);
        })  
});
// Create New Rental Endpoint
router.post('', userCtrl.authMiddleware, (req, res) => {
    const {title, city, category, street, image, bedrooms, shared, description, dailyRate} = req.body;

    const user = res.locals.user;
    const rental = new Rental({title, city, category, street, image, bedrooms, shared, description, dailyRate});
    rental.user = user; 
    Rental.create(rental, function(err, rental) {
        if(err){
            return res.status(422).send({errors: normalizeErrors(err.errors)})
        }
        
        User.updateOne({_id: user.id}, {$push: {rentals: rental}}, function(err){
            console.log(err)
        });
        return res.json(rental)
    })
})

module.exports = router;