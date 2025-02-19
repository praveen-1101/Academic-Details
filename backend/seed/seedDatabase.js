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
           
            let rollNumberBase = "22L31A05";

            for (let i = 1; i <= 253; i++) {
                let suffix;
                
                if (i < 100) {
                    suffix = i.toString().padStart(2, '0'); 
                } else {
                    const letter = String.fromCharCode(65 + Math.floor((i - 100) / 10)); // A, B, C...
                    const digit = (i - 100) % 10; 
                    suffix = `${letter}${digit}`; 
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
            { name: "CNS", branch: "CSE1", semester: 2, year: 3, type: "Theory", faculty: "Dr. A1" },
            { name: "ML", branch: "CSE1", semester: 2, year: 3, type: "Theory", faculty: "Prof. B1" },
            { name: "MEFA", branch: "CSE1", semester: 2, year: 3, type: "Theory", faculty: "Dr. C1" },
            { name: "UNIX", branch: "CSE1", semester: 2, year: 3, type: "Theory", faculty: "Prof. D1" },
            { name: "AI", branch: "CSE1", semester: 2, year: 3, type: "Theory", faculty: "Dr. E1" },
            { name: "ML LAB", branch: "CSE1", semester: 2, year: 3, type: "Practical", faculty: "Prof. F1" },
            { name: "OOAD LAB", branch: "CSE1", semester: 2, year: 3, type: "Practical", faculty: "Prof. G1" },
            { name: "GIT HUB", branch: "CSE1", semester: 2, year: 3, type: "Theory", faculty: "Dr. H1" },
            { name: "WT", branch: "CSE1", semester: 2, year: 3, type: "Practical", faculty: "Prof. I1" },
            { name: "OTHERS", branch: "CSE1", semester: 2, year: 3, type: "Theory", faculty: "Dr. J1" },
            { name: "LCS", branch: "CSE1", semester: 2, year: 3, type: "Theory", faculty: "Prof. K1" },
            { name: "IA/V SKILL", branch: "CSE1", semester: 2, year: 3, type: "Theory", faculty: "Dr. L1" },
            { name: "WTR", branch: "CSE1", semester: 2, year: 3, type: "Theory", faculty: "Prof. M1" },
            { name: "CRT", branch: "CSE1", semester: 2, year: 3, type: "Theory", faculty: "Dr. N1" },
            { name: "FCA", branch: "CSE1", semester: 1, year: 3, type: "Theory", faculty: "Prof. O1" },
            { name: "DWDM", branch: "CSE1", semester: 1, year: 3, type: "Theory", faculty: "Dr. P1" },
            { name: "CCNA", branch: "CSE1", semester: 1, year: 3, type: "Theory", faculty: "Prof. Q1" },
            { name: "ADS", branch: "CSE1", semester: 1, year: 3, type: "Theory", faculty: "Dr. R1" },
            { name: "CN", branch: "CSE1", semester: 1, year: 3, type: "Theory", faculty: "Prof. S1" },
            { name: "DAA LAB", branch: "CSE1", semester: 1, year: 3, type: "Practical", faculty: "Dr. T1" },
            { name: "CN LAB", branch: "CSE1", semester: 1, year: 3, type: "Practical", faculty: "Prof. U1" },

            

            { name: "CNS", branch: "CSE2", semester: 2, year: 3, type: "Theory", faculty: "Dr. A2" },
    { name: "ML", branch: "CSE2", semester: 2, year: 3, type: "Theory", faculty: "Prof. B2" },
    { name: "MEFA", branch: "CSE2", semester: 2, year: 3, type: "Theory", faculty: "Dr. C2" },
    { name: "UNIX", branch: "CSE2", semester: 2, year: 3, type: "Theory", faculty: "Prof. D2" },
    { name: "AI", branch: "CSE2", semester: 2, year: 3, type: "Theory", faculty: "Dr. E2" },
    { name: "ML LAB", branch: "CSE2", semester: 2, year: 3, type: "Practical", faculty: "Prof. F2" },
    { name: "OOAD LAB", branch: "CSE2", semester: 2, year: 3, type: "Practical", faculty: "Prof. G2" },
    { name: "GIT HUB", branch: "CSE2", semester: 2, year: 3, type: "Theory", faculty: "Dr. H2" },
    { name: "WT", branch: "CSE2", semester: 2, year: 3, type: "Practical", faculty: "Prof. I2" },
    { name: "OTHERS", branch: "CSE2", semester: 2, year: 3, type: "Theory", faculty: "Dr. J2" },
    { name: "LCS", branch: "CSE2", semester: 2, year: 3, type: "Theory", faculty: "Prof. K2" },
    { name: "IA/V SKILL", branch: "CSE2", semester: 2, year: 3, type: "Theory", faculty: "Dr. L2" },
    { name: "WTR", branch: "CSE2", semester: 2, year: 3, type: "Theory", faculty: "Prof. M2" },
    { name: "CRT", branch: "CSE2", semester: 2, year: 3, type: "Theory", faculty: "Dr. N2" },
    { name: "FCA", branch: "CSE2", semester: 1, year: 3, type: "Theory", faculty: "Prof. O2" },
    { name: "DWDM", branch: "CSE2", semester: 1, year: 3, type: "Theory", faculty: "Dr. P2" },
    { name: "CCNA", branch: "CSE2", semester: 1, year: 3, type: "Theory", faculty: "Prof. Q2" },
    { name: "ADS", branch: "CSE2", semester: 1, year: 3, type: "Theory", faculty: "Dr. R2" },
    { name: "CN", branch: "CSE2", semester: 1, year: 3, type: "Theory", faculty: "Prof. S2" },
    { name: "DAA LAB", branch: "CSE2", semester: 1, year: 3, type: "Practical", faculty: "Dr. T2" },
    { name: "CN LAB", branch: "CSE2", semester: 1, year: 3, type: "Practical", faculty: "Prof. U2" },


            { name: "CNS", branch: "CSE3", semester: 2, year: 3, type: "Theory", faculty: "Dr. A3" },
            { name: "ML", branch: "CSE3", semester: 2, year: 3, type: "Theory", faculty: "Prof. B3" },
            { name: "MEFA", branch: "CSE3", semester: 2, year: 3, type: "Theory", faculty: "Dr. C3" },
            { name: "UNIX", branch: "CSE3", semester: 2, year: 3, type: "Theory", faculty: "Prof. D3" },
            { name: "AI", branch: "CSE3", semester: 2, year: 3, type: "Theory", faculty: "Dr. E3" },
            { name: "ML LAB", branch: "CSE3", semester: 2, year: 3, type: "Practical", faculty: "Prof. F3" },
            { name: "OOAD LAB", branch: "CSE3", semester: 2, year: 3, type: "Practical", faculty: "Prof. G3" },
            { name: "GIT HUB", branch: "CSE3", semester: 2, year: 3, type: "Theory", faculty: "Dr. H3" },
            { name: "WT", branch: "CSE3", semester: 2, year: 3, type: "Practical", faculty: "Prof. I3" },
            { name: "OTHERS", branch: "CSE3", semester: 2, year: 3, type: "Theory", faculty: "Dr. J3" },
            { name: "LCS", branch: "CSE3", semester: 2, year: 3, type: "Theory", faculty: "Prof. K3" },
            { name: "IA/V SKILL", branch: "CSE3", semester: 2, year: 3, type: "Theory", faculty: "Dr. L3" },
            { name: "WTR", branch: "CSE3", semester: 2, year: 3, type: "Theory", faculty: "Prof. M3" },
            { name: "CRT", branch: "CSE3", semester: 2, year: 3, type: "Theory", faculty: "Dr. N3" },
            { name: "FCA", branch: "CSE3", semester: 1, year: 3, type: "Theory", faculty: "Prof. O3" },
            { name: "DWDM", branch: "CSE3", semester: 1, year: 3, type: "Theory", faculty: "Dr. P3" },
            { name: "CCNA", branch: "CSE3", semester: 1, year: 3, type: "Theory", faculty: "Prof. Q3" },
            { name: "ADS", branch: "CSE3", semester: 1, year: 3, type: "Theory", faculty: "Dr. R3" },
            { name: "CN", branch: "CSE3", semester: 1, year: 3, type: "Theory", faculty: "Prof. S3" },
            { name: "DAA LAB", branch: "CSE3", semester: 1, year: 3, type: "Practical", faculty: "Dr. T3" },
            { name: "CN LAB", branch: "CSE3", semester: 1, year: 3, type: "Practical", faculty: "Prof. U3" },


            { name: "CNS", branch: "CSE4", semester: 2, year: 3, type: "Theory", faculty: "Dr. A4" },
            { name: "ML", branch: "CSE4", semester: 2, year: 3, type: "Theory", faculty: "Prof. B4" },
            { name: "MEFA", branch: "CSE4", semester: 2, year: 3, type: "Theory", faculty: "Dr. C4" },
            { name: "UNIX", branch: "CSE4", semester: 2, year: 3, type: "Theory", faculty: "Prof. D4" },
            { name: "AI", branch: "CSE4", semester: 2, year: 3, type: "Theory", faculty: "Dr. E4" },
            { name: "ML LAB", branch: "CSE4", semester: 2, year: 3, type: "Practical", faculty: "Prof. F4" },
            { name: "OOAD LAB", branch: "CSE4", semester: 2, year: 3, type: "Practical", faculty: "Prof. G4" },
            { name: "GIT HUB", branch: "CSE4", semester: 2, year: 3, type: "Theory", faculty: "Dr. H4" },
            { name: "WT", branch: "CSE4", semester: 2, year: 3, type: "Practical", faculty: "Prof. I4" },
            { name: "OTHERS", branch: "CSE4", semester: 2, year: 3, type: "Theory", faculty: "Dr. J4" },
            { name: "LCS", branch: "CSE4", semester: 2, year: 3, type: "Theory", faculty: "Prof. K4" },
            { name: "IA/V SKILL", branch: "CSE4", semester: 2, year: 3, type: "Theory", faculty: "Dr. L4" },
            { name: "WTR", branch: "CSE4", semester: 2, year: 3, type: "Theory", faculty: "Prof. M4" },
            { name: "CRT", branch: "CSE4", semester: 2, year: 3, type: "Theory", faculty: "Dr. N4" },
            { name: "FCA", branch: "CSE4", semester: 1, year: 3, type: "Theory", faculty: "Prof. O4" },
            { name: "DWDM", branch: "CSE4", semester: 1, year: 3, type: "Theory", faculty: "Dr. P4" },
            { name: "CCNA", branch: "CSE4", semester: 1, year: 3, type: "Theory", faculty: "Prof. Q4" },
            { name: "ADS", branch: "CSE4", semester: 1, year: 3, type: "Theory", faculty: "Dr. R4" },
            { name: "CN", branch: "CSE4", semester: 1, year: 3, type: "Theory", faculty: "Prof. S4" },
            { name: "DAA LAB", branch: "CSE4", semester: 1, year: 3, type: "Practical", faculty: "Dr. T4" },
            { name: "CN LAB", branch: "CSE4", semester: 1, year: 3, type: "Practical", faculty: "Prof. U4" }
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
