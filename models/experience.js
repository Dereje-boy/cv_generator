const mongoose = require('mongoose')

const experience = mongoose.Schema({
    position: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 5,
        maxlength: 50
    },
    companyName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 2,
        maxlength: 50
    },
    aboutExperience: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 2,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
    },
    //this is used to reference whom experience info is added
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }

});

module.exports = mongoose.model('experience', experience);