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

        /* for (let i = 1; i <= 65; i++) {
            const rollNumber = `22L31A05${i.toString().padStart(2, '0')}`;
            users.push({
                username: rollNumber,
                password: rollNumber, 
                name: `Student ${i}`
            });
        } */
           
            let rollNumberBase = "22L31A05";

            for (let i = 1; i <= 253; i++) {
                let suffix;
                
                if (i < 100) {
                    suffix = i.toString().padStart(2, '0'); // 00 to 99
                } else {
                    const letter = String.fromCharCode(65 + Math.floor((i - 100) / 10)); // A, B, C...
                    const digit = (i - 100) % 10; // 0-9
                    suffix = `${letter}${digit}`; // A0, A1, A2...Z9
                }
    
                const rollNumber = rollNumberBase + suffix;
                users.push({
                    username: rollNumber,
                    password: rollNumber, 
                    name: `Student ${users.length + 1}`
                });
            }

        for (let i = 1; i <= 47; i++) {
            const rollNumber = `23L35A05${i.toString().padStart(2, '0')}`;
            users.push({
                username: rollNumber,
                password: rollNumber, 
                name: `Student ${users.length + 65}`
            });
        }
        await User.insertMany(users);
        console.log('Students seeded successfully.');

        const subjects = 
        [
            { name: "CNS", branch: "CSE1", semester: 2, year: 3, type: "Theory" },
            { name: "ML", branch: "CSE1", semester: 2, year: 3, type: "Theory" },
            { name: "MEFA", branch: "CSE1", semester: 2, year: 3, type: "Theory" },
            { name: "UNIX", branch: "CSE1", semester: 2, year: 3, type: "Theory" },
            { name: "AI", branch: "CSE1", semester: 2, year: 3, type: "Theory" },
            { name: "ML LAB", branch: "CSE1", semester: 2, year: 3, type: "Practical" },
            { name: "OOAD LAB", branch: "CSE1", semester: 2, year: 3, type: "Practical" },
            { name: "GIT HUB", branch: "CSE1", semester: 2, year: 3, type: "Theory" },
            { name: "WT", branch: "CSE1", semester: 2, year: 3, type: "Practical" },
            { name: "OTHERS", branch: "CSE1", semester: 2, year: 3, type: "Theory" },
            { name: "LCS", branch: "CSE1", semester: 2, year: 3, type: "Theory" },
            { name: "IA/V SKILL", branch: "CSE1", semester: 2, year: 3, type: "Theory" },
            { name: "WTR", branch: "CSE1", semester: 2, year: 3, type: "Theory" },
            { name: "CRT", branch: "CSE1", semester: 2, year: 3, type: "Theory" },
            { name: "FCA", branch: "CSE1", semester: 1, year: 3, type: "Theory" },
            { name: "DWDM", branch: "CSE1", semester: 1, year: 3, type: "Theory" },
            { name: "CCNA", branch: "CSE1", semester: 1, year: 3, type: "Theory" },
            { name: "ADS", branch: "CSE1", semester: 1, year: 3, type: "Theory" },
            { name: "CN", branch: "CSE1", semester: 1, year: 3, type: "Theory" },
            { name: "DAA LAB", branch: "CSE1", semester: 1, year: 3, type: "Practical" },
            { name: "CN LAB", branch: "CSE1", semester: 1, year: 3, type: "Practical" },

            

            { name: "CNS", branch: "CSE2", semester: 2, year: 3, type: "Theory" },
            { name: "ML", branch: "CSE2", semester: 2, year: 3, type: "Theory" },
            { name: "MEFA", branch: "CSE2", semester: 2, year: 3, type: "Theory" },
            { name: "UNIX", branch: "CSE2", semester: 2, year: 3, type: "Theory" },
            { name: "AI", branch: "CSE2", semester: 2, year: 3, type: "Theory" },
            { name: "ML LAB", branch: "CSE2", semester: 2, year: 3, type: "Practical" },
            { name: "OOAD LAB", branch: "CSE2", semester: 2, year: 3, type: "Practical" },
            { name: "GIT HUB", branch: "CSE2", semester: 2, year: 3, type: "Theory" },
            { name: "WT", branch: "CSE2", semester: 2, year: 3, type: "Practical" },
            { name: "OTHERS", branch: "CSE2", semester: 2, year: 3, type: "Theory" },
            { name: "LCS", branch: "CSE2", semester: 2, year: 3, type: "Theory" },
            { name: "IA/V SKILL", branch: "CSE2", semester: 2, year: 3, type: "Theory" },
            { name: "WTR", branch: "CSE2", semester: 2, year: 3, type: "Theory" },
            { name: "CRT", branch: "CSE2", semester: 2, year: 3, type: "Theory" },
            { name: "FCA", branch: "CSE2", semester: 1, year: 3, type: "Theory" },
            { name: "DWDM", branch: "CSE2", semester: 1, year: 3, type: "Theory" },
            { name: "CCNA", branch: "CSE2", semester: 1, year: 3, type: "Theory" },
            { name: "ADS", branch: "CSE2", semester: 1, year: 3, type: "Theory" },
            { name: "CN", branch: "CSE2", semester: 1, year: 3, type: "Theory" },
            { name: "DAA LAB", branch: "CSE2", semester: 1, year: 3, type: "Practical" },
            { name: "CN LAB", branch: "CSE2", semester: 1, year: 3, type: "Practical" },


            { name: "CNS", branch: "CSE3", semester: 2, year: 3, type: "Theory" },
            { name: "ML", branch: "CSE3", semester: 2, year: 3, type: "Theory" },
            { name: "MEFA", branch: "CSE3", semester: 2, year: 3, type: "Theory" },
            { name: "UNIX", branch: "CSE3", semester: 2, year: 3, type: "Theory" },
            { name: "AI", branch: "CSE3", semester: 2, year: 3, type: "Theory" },
            { name: "ML LAB", branch: "CSE3", semester: 2, year: 3, type: "Practical" },
            { name: "OOAD LAB", branch: "CSE3", semester: 2, year: 3, type: "Practical" },
            { name: "GIT HUB", branch: "CSE3", semester: 2, year: 3, type: "Theory" },
            { name: "WT", branch: "CSE3", semester: 2, year: 3, type: "Practical" },
            { name: "OTHERS", branch: "CSE3", semester: 2, year: 3, type: "Theory" },
            { name: "LCS", branch: "CSE3", semester: 2, year: 3, type: "Theory" },
            { name: "IA/V SKILL", branch: "CSE3", semester: 2, year: 3, type: "Theory" },
            { name: "WTR", branch: "CSE3", semester: 2, year: 3, type: "Theory" },
            { name: "CRT", branch: "CSE3", semester: 2, year: 3, type: "Theory" },
            { name: "FCA", branch: "CSE3", semester: 1, year: 3, type: "Theory" },
            { name: "DWDM", branch: "CSE3", semester: 1, year: 3, type: "Theory" },
            { name: "CCNA", branch: "CSE3", semester: 1, year: 3, type: "Theory" },
            { name: "ADS", branch: "CSE3", semester: 1, year: 3, type: "Theory" },
            { name: "CN", branch: "CSE3", semester: 1, year: 3, type: "Theory" },
            { name: "DAA LAB", branch: "CSE3", semester: 1, year: 3, type: "Practical" },
            { name: "CN LAB", branch: "CSE3", semester: 1, year: 3, type: "Practical" },


            { name: "CNS", branch: "CSE4", semester: 2, year: 3, type: "Theory" },
            { name: "ML", branch: "CSE4", semester: 2, year: 3, type: "Theory" },
            { name: "MEFA", branch: "CSE4", semester: 2, year: 3, type: "Theory" },
            { name: "UNIX", branch: "CSE4", semester: 2, year: 3, type: "Theory" },
            { name: "AI", branch: "CSE4", semester: 2, year: 3, type: "Theory" },
            { name: "ML LAB", branch: "CSE4", semester: 2, year: 3, type: "Practical" },
            { name: "OOAD LAB", branch: "CSE4", semester: 2, year: 3, type: "Practical" },
            { name: "GIT HUB", branch: "CSE4", semester: 2, year: 3, type: "Theory" },
            { name: "WT", branch: "CSE4", semester: 2, year: 3, type: "Practical" },
            { name: "OTHERS", branch: "CSE4", semester: 2, year: 3, type: "Theory" },
            { name: "LCS", branch: "CSE4", semester: 2, year: 3, type: "Theory" },
            { name: "IA/V SKILL", branch: "CSE4", semester: 2, year: 3, type: "Theory" },
            { name: "WTR", branch: "CSE4", semester: 2, year: 3, type: "Theory" },
            { name: "CRT", branch: "CSE4", semester: 2, year: 3, type: "Theory" },
            { name: "FCA", branch: "CSE4", semester: 1, year: 3, type: "Theory" },
            { name: "DWDM", branch: "CSE4", semester: 1, year: 3, type: "Theory" },
            { name: "CCNA", branch: "CSE4", semester: 1, year: 3, type: "Theory" },
            { name: "ADS", branch: "CSE4", semester: 1, year: 3, type: "Theory" },
            { name: "CN", branch: "CSE4", semester: 1, year: 3, type: "Theory" },
            { name: "DAA LAB", branch: "CSE4", semester: 1, year: 3, type: "Practical" },
            { name: "CN LAB", branch: "CSE4", semester: 1, year: 3, type: "Practical" }
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
