const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        immutable: true,
        minlength: 5,
        maxlength: 50

    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 50
    }
});

//hashing password the jwt, and using the token as hashed password to save
//I know I can use bcrypt, I will switch to it.
userSchema.pre('save', function (next) {
    const user = this;
    // console.log('the user after added with "mongo\'s db objectID" included : ', user)
    if (!user.isModified('password')) return next();
    jwt.sign(user.password, 'my-secret-key', (err, token) => {

        if (err) {
            console.log(err);
            return next(err)
        }
        console.log(token)
        user.password = token;
        next()
    })
})

module.exports = mongoose.model('user', userSchema);