/* const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5,validate: {
        validator: Number.isInteger, // Ensuring it's an integer
        message: "Rating must be an integer between 1 and 5."
      } },
    count: { type: Number, default: 1 }
});

module.exports = mongoose.model('Rating', RatingSchema);
 */


const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    totalRating: { type: Number, default: 0 },
    studentCount: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 }
});

module.exports = mongoose.model('Rating', RatingSchema);
