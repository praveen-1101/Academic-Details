const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Subject = require('../models/Subject');
require('dotenv').config();
const connectDB = require('../config/db');

const seedDatabase = async () => {
    await connectDB();
    try 
    {
        await User.deleteMany();
        await Subject.deleteMany();

        const users = [];

        for (let i = 1; i <= 65; i++) {
            const rollNumber = `22L31A05${i.toString().padStart(2, '0')}`;
            users.push({
                username: rollNumber,
                password: rollNumber, 
                name: `Student ${i}`
            });
        }
        for (let i = 1; i <= 11; i++) {
            const rollNumber = `23L35A05${i.toString().padStart(2, '0')}`;
            users.push({
                username: rollNumber,
                password: rollNumber, 
                name: `Student ${i + 65}`
            });
        }
        await User.insertMany(users);
        console.log('Students seeded successfully.');

        const subjects = [
            { name: "CNS", branch: "CSE", semester: 2, year: 3, type: "Theory" },
            { name: "ML", branch: "CSE", semester: 2, year: 3, type: "Theory" },
            { name: "MEFA", branch: "CSE", semester: 2, year: 3, type: "Theory" },
            { name: "UNIX", branch: "CSE", semester: 2, year: 3, type: "Theory" },
            { name: "AI", branch: "CSE", semester: 2, year: 3, type: "Theory" },
            { name: "ML LAB", branch: "CSE", semester: 2, year: 3, type: "Practical" },
            { name: "OOAD LAB", branch: "CSE", semester: 2, year: 3, type: "Practical" },
            { name: "GIT HUB", branch: "CSE", semester: 2, year: 3, type: "Theory" },
            { name: "WT", branch: "CSE", semester: 2, year: 3, type: "Practical" },
            { name: "OTHERS", branch: "CSE", semester: 2, year: 3, type: "Theory" },
            { name: "LCS", branch: "CSE", semester: 2, year: 3, type: "Theory" },
            { name: "IA/V SKILL", branch: "CSE", semester: 2, year: 3, type: "Theory" },
            { name: "WTR", branch: "CSE", semester: 2, year: 3, type: "Theory" },
            { name: "CRT", branch: "CSE", semester: 2, year: 3, type: "Theory" },
            { name: "FCA", branch: "CSE", semester: 1, year: 3, type: "Theory" },
            { name: "DWDM", branch: "CSE", semester: 1, year: 3, type: "Theory" },
            { name: "CCNA", branch: "CSE", semester: 1, year: 3, type: "Theory" },
            { name: "ADS", branch: "CSE", semester: 1, year: 3, type: "Theory" },
            { name: "CN", branch: "CSE", semester: 1, year: 3, type: "Theory" },
            { name: "DAA LAB", branch: "CSE", semester: 1, year: 3, type: "Practical" },
            { name: "CN LAB", branch: "CSE", semester: 1, year: 3, type: "Practical" }
        ];
        
        await Subject.insertMany(subjects);
        console.log('Subjects seeded successfully.');

        process.exit();
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedDatabase();
