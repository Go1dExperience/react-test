const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {
        type: String,
        min: [4, 'Too short! Minimum requirement is 4 characters'],
        max: [32, 'Too long! Maximum of 32 characters']
    },
    password: {
        type: String,
        required: 'Password is required',
        min: [4, 'Too short! Minimum requirement is 4 characters'],
        max: [32, 'Too long! Maximum of 32 characters']
    },
    email: {
        type: String,
        min: [4, 'Too short! Minimum requirement is 4 characters'],
        max: [32, 'Too long! Maximum of 32 characters'],
        required: 'Email is required',
        lowercase: true,
        unique: true, 
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    // Rental this user has
    rentals: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Rental'
        }
    ]
});

userSchema.methods.hasSamePassword = function(requestedPassword){
    return bcrypt.compareSync(requestedPassword, this.password);
}

userSchema.pre('save', function(next){
    const user = this;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err){
                console.log(err);
            }
            user.password = hash;
            next();
        })
    })
})
module.exports = mongoose.model('User', userSchema);