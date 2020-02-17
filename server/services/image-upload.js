const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../config');

aws.config.update({
    secretAccessKey: config.SECRET_KEY,
    accessKeyId: config.ACCESS_KEY,
    region: 'ap-southeast-1'
})
const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
    console.log(file);
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true)
    }
    else {
        cb(new Error('Invalid File Type: Only JPEG and PNG are allowed'), false);
    }
}
 
const upload = multer({
    fileFilter,    
    storage: multerS3({
        s3,
        bucket: 'bwm-react-dev',
        acl:'public-read',
        metadata: function (req, file, cb) {
        cb(null, {fieldName: 'Testing Metadata'});
        },
        key: function (req, file, cb) {
        cb(null, Date.now().toString()+'.'+'jpeg')
        }
    })
});

module.exports = upload;