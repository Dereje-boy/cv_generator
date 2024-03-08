const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const PI_schema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 25
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 25
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 10,
        maxlength: 25
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 5,
        maxlength: 50
    },
    city: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 2,
        maxlength: 50
    },
    state: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 2,
        maxlength: 50
    },
    aboutMe: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 2,
    },
    //this is used to reference whom PI info is added
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
        immutable: true,
    }
});

module.exports = mongoose.model('pinformation', PI_schema);