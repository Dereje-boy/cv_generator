const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    }
});

class user {
    constructor(firstname, lastname, phoneNumber, email, city, state, aboutME) {
        this.firstname = firstname
        this.lastname = lastname
        this.phoneNumber = phoneNumber
        this.email = email
        this.city = city
        this.state = state
        this.aboutME = aboutME
    }
}

module.exports = mongoose.model('user', userSchema);