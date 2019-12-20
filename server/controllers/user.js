// Middleware to export to users routes
// Destination: /api/v1/users

const User = require('../models/user');
const {normalizeErrors, validateErrors} = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config =  require('../config/dev');
const {validationResult} = require('express-validator');

/////////////////////////////////////////////////////////////////////////////////////////
                                    // AUTH ROUTE
/////////////////////////////////////////////////////////////////////////////////////////
exports.auth = function(req, res){
    const {email, password} = req.body;
    const errors = validationResult(req);
    // Check for Error
        if(!errors.isEmpty()){
            return res.status(422).json({errors: validateErrors(errors.errors)});
        } else {
        User.findOne({email}, (err, user) => {
            if(err){
                return res.status(422)
                .send({errors: normalizeErrors(err.errors)});     
            }
            // If user doesnot exist
            if(!user){
                return res.status(422)
                .send({errors: [{title: 'Invalid User', detail:'User does not exist'}]})
            }
            // If password is correct
            if(user.hasSamePassword(password)){
                // Create Json Web Token
                const token = jwt.sign({
                    userId: user.id,
                    username: user.username
                }, config.SECRET, {expiresIn: '1h'});
                // Return token to browser
                return res.json(token);
            } else {
                return res.status(422)
                .send({errors: [{title: 'Incorrect Data', detail:'Incorect email or password'}]})
            }
        })
    }   
}
/////////////////////////////////////////////////////////////////////////////////////////
                                    // AUTH MIDDLEWARE
/////////////////////////////////////////////////////////////////////////////////////////
exports.authMiddleware = function(req, res, next){
    const token = req.headers.authorization;
    
    if(!token){
        return res.status(401)
        .send({errors: [{title: 'Not Authorized', detail:'You need to login'}]});
    }
    const user = passToken(token);
    User.findById(user.userId, (err, user) => {
        if(err){
            return res.status(422)
            .send({errors: normalizeErrors(err.errors)});    
        }
        if(user){
            res.locals.user = user;
            next();
        }
        else{
            return res.status(401)
            .send({errors: [{title: 'Not Authorized', detail:'You need to login'}]});
        }
    })

}
// Pass the token to the function to decode it 
function passToken(token){
    return decoded = jwt.verify(token.split(' ')[1], config.SECRET)
}
/////////////////////////////////////////////////////////////////////////////////////////
                                    // REGISTER ROUTE
/////////////////////////////////////////////////////////////////////////////////////////
//Route: /register
exports.register = function(req, res){
    const {username, email, password, passwordConfirm} = req.body;
    // Check for empty string
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: validateErrors(errors.errors)});
    }
    else{   
        User.findOne({email}, (err, user) => {
            if(err){
                return res.status(422)  
                .send({errors: normalizeErrors(err.errors)});     
            }
            // If user existed
            if(user){
                return res.status(422)
                .send({errors: [{title: 'User existed', detail: 'User already exsited'}]});   
            }
            const newUser = new User({
                username,
                email,
                password
            });
            newUser.save((err) => {
                if(err){
                    return res.status(422).send({errors: normalizeErrors(err.errors)});  
                }
                res.json({'registered': true});
            });
        });
    }
}