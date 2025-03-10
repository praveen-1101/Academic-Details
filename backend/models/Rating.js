const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    subjectId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Subject', 
        required: true 
    },
    rating: {
        type: Number,
        required: true, 
        min: 1, 
        max: 4
    },
    branch: { 
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Rating', RatingSchema);
