const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    nameOfUniversity: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    titleOfDocument: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    CGPA: {
        type: Number,
        required: true,
        min: 2,
        max: 4
    },
    yearOfGraduation: {
        type: Date,
        required: true,
    },

    //this is used to reference whom education info is added
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});


module.exports = mongoose.model('education', educationSchema);