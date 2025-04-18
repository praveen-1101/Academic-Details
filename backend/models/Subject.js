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
        enum: [
            "CSE1", "CSE2", "CSE3", "CSE4", "CSE5", "CSE6", "CSE7", "CSE8", "CSE9", "CSE10",
            "ECE1", "ECE2", "ECE3", "ECE4", "ECE5", "ECE6", "ECE7", "ECE8", "ECE9", "ECE10",
            "MECH1", "MECH2", "MECH3", "MECH4", "MECH5", "MECH6", "MECH7", "MECH8", "MECH9", "MECH10",
            "EEE1", "EEE2", "EEE3", "EEE4", "EEE5", "EEE6", "EEE7", "EEE8", "EEE9", "EEE10",
            "CIVIL1", "CIVIL2", "CIVIL3", "CIVIL4", "CIVIL5", "CIVIL6", "CIVIL7", "CIVIL8", "CIVIL9", "CIVIL10",
            "AIDS1", "AIDS2", "AIDS3", "AIDS4", "AIDS5", "AIDS6", "AIDS7", "AIDS8", "AIDS9", "AIDS10",
            "IT1", "IT2", "IT3", "IT4", "IT5", "IT6", "IT7", "IT8", "IT9", "IT10",
            "ECM1", "ECM2", "ECM3", "ECM4", "ECM5", "ECM6", "ECM7", "ECM8", "ECM9", "ECM10",
            "AI1", "AI2", "AI3", "AI4", "AI5", "AI6", "AI7", "AI8", "AI9", "AI10",
            "CS1", "CS2", "CS3", "CS4", "CS5", "CS6", "CS7", "CS8", "CS9", "CS10",
            "DS1", "DS2", "DS3", "DS4", "DS5", "DS6", "DS7", "DS8", "DS9", "DS10"
          ],
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

