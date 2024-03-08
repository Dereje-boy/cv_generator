const mongoose = require('mongoose')

const levelEnum = ['native', 'fluent', 'advanced', 'beginner'];

const language = mongoose.Schema({
    language: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        maxlength: 2,
        maxlength: 50,
    },
    level: {
        type: levelEnum,
        required: true
    },
    //this is used to reference whom langauge info is being added for
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

module.exports = mongoose.model('language', language);