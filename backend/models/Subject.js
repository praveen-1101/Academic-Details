const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
    name: 
    { 
        type: String, 
        required: true 
    },
    branch:
    { 
        type: String, 
        enum: ["CSE1", "CSE2", "CSE3", "CSE4"], 
        required: true 
    },
    semester: 
    { 
        type: Number, 
        enum: [1, 2], 
        required: true 
    },
    year: 
    { 
        type: Number, 
        enum: [1, 2, 3, 4], 
        required: true 
    },
    averageRating: 
    {
        type: Number, 
        default: 0 
    },
    totalRatings: 
    { 
        type: Number, 
        default: 0 
    },
    sumOfRatings: 
    { 
        type: Number, default: 0 
    },

    type:
    { 
        type: String,
        enum: ["Theory", "Practical"] 
    } ,
    faculty: 
    {
        type:String,
    },
    messages: { type: [String], default: [] }
});

module.exports = mongoose.model("Subject", SubjectSchema);

