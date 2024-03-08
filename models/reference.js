const mongoose = require('mongoose')

const referenceSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 5,
        maxlength: 50
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
        required: true,
        trim: true,
        lowercase: true,
        minlength: 5,
        maxlength: 50
    },
    role: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 5,
        maxlength: 100
    },
    //this is used to reference whom reference info is added
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

module.exports = mongoose.model('reference', referenceSchema);