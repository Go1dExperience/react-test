const { check } = require('express-validator');
/////////////////////////////////////////////////////////////////////////////////////////
                                    // REGISTER AUTH
/////////////////////////////////////////////////////////////////////////////////////////
exports.register = [
    check('email').not().isEmpty().withMessage('Email must not be empty')
    .isEmail().withMessage('Incorrect email format')
    .isLength({min: 4, max: 128}).withMessage('Must be between 4 and 128 characters'),
    check('username').not().isEmpty().withMessage('Please enter your username')
    .isLength({min: 4, max: 128}).withMessage('Must be between 4 and 128 characters'),
    check('password').not().isEmpty().withMessage('Please fill in your password')
    .isLength({min: 4, max: 128}).withMessage('Must be between 4 and 128 characters'),
    check('passwordConfirm').custom((value, {req}) => {
        if (value !== req.body.password){
            throw new Error("Passwords do not match");
        }
        else{
            return value    
        }
     }),
    check('passwordConfirm').not().isEmpty().withMessage('Please confirm your password')
]
/////////////////////////////////////////////////////////////////////////////////////////
                                    // AUTH MIDDLEWARE
/////////////////////////////////////////////////////////////////////////////////////////
exports.auth = [
    check('email').not().isEmpty().withMessage('Email must not be empty')
    .isEmail().withMessage('Incorrect email format')
    .isLength({min: 4, max: 128}).withMessage('Must be between 4 and 128 characters'),
    check('password').not().isEmpty().withMessage('Please fill in your password')
    .isLength({min: 4, max: 128}).withMessage('Must be between 4 and 128 characters')
]