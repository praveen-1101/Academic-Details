/* const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    branch: { type: String, required: true },
    semester: { type: Number, required: true },
    type: { type: String, enum: ['Theory', 'Practical'], required: true }
});

module.exports = mongoose.model('Subject', SubjectSchema);
 */

const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    branch: { type: String, enum: ["CSE", "ECE", "EEE", "IT", "MECH", "CIVIL"], required: true },
    semester: { type: Number, enum: [1, 2, 3, 4, 5, 6, 7, 8], required: true },
    btechYear: { type: Number, enum: [1, 2, 3, 4], required: true },
    averageRating: { type: Number, default: 0 },
    studentCount: { type: Number, default: 0 },
    type: { type: String, enum: ["Theory", "Practical"], required: true } // NEW FIELD ADDED
});

module.exports = mongoose.model("Subject", SubjectSchema);

