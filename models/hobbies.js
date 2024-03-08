const mongoose = require('mongoose')

const hobbiesSchema = mongoose.Schema({
    hobby: {
        type: [String],
        required: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 50
    },
    //this is used to reference whom hobbies info is added
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
    }
})

module.exports = mongoose.model('hobbies', hobbiesSchema);