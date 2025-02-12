const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Subject = require('../models/Subject');
require('dotenv').config();
const connectDB = require('../config/db');

const seedDatabase = async () => {
    await connectDB();
    try {
        // Clear existing data
        await User.deleteMany();
        await Subject.deleteMany();

        // Generate 50 students
        const users = [];
        for (let i = 1; i <= 50; i++) {
            users.push({
                username: `student${i}`,
                password: await bcrypt.hash('password123', 10),
                name: `Student ${i}`
            });
        }
        await User.insertMany(users);
        console.log('Students seeded successfully.');

        // Predefined subjects
        const subjects = [
            // CSE Subjects
            
            { name: 'Mathematics', branch: 'CSE', semester: 1, btechYear: 1, type: 'Theory' },
            { name: 'Physics', branch: 'CSE', semester: 1, btechYear: 1, type: 'Theory' },
            { name: 'Programming in C', branch: 'CSE', semester: 1, btechYear: 1, type: 'Practical' },
            { name: 'Data Structures', branch: 'CSE', semester: 2, btechYear: 1, type: 'Theory' },
            { name: 'OOPS with Java', branch: 'CSE', semester: 2, btechYear: 1, type: 'Practical' },
            { name: 'DBMS', branch: 'CSE', semester: 3, btechYear: 2, type: 'Theory' },
            { name: 'Operating Systems', branch: 'CSE', semester: 3, btechYear: 2, type: 'Theory' },
            { name: 'Computer Networks', branch: 'CSE', semester: 4, btechYear: 2, type: 'Theory' },
            { name: 'Web Technologies', branch: 'CSE', semester: 4, btechYear: 2, type: 'Practical' },
            { name: 'Machine Learning', branch: 'CSE', semester: 5, btechYear: 3, type: 'Theory' },
            { name: 'Software Engineering', branch: 'CSE', semester: 5, btechYear: 3, type: 'Theory' },
            { name: 'Cloud Computing', branch: 'CSE', semester: 6, btechYear: 3, type: 'Theory' },
            { name: 'Artificial Intelligence', branch: 'CSE', semester: 6, btechYear: 3, type: 'Theory' },
            { name: 'Cyber Security', branch: 'CSE', semester: 7, btechYear: 4, type: 'Theory' },
            { name: 'Internet of Things', branch: 'CSE', semester: 7, btechYear: 4, type: 'Theory' },
            { name: 'Big Data Analytics', branch: 'CSE', semester: 8, btechYear: 4, type: 'Theory' },
            { name: 'Final Year Project', branch: 'CSE', semester: 8, btechYear: 4, type: 'Practical' },
            // ECE Subjects
            { name: 'Mathematics', branch: 'ECE', semester: 1, btechYear: 1, type: 'Theory' },
            { name: 'Physics', branch: 'ECE', semester: 1, btechYear: 1, type: 'Theory' },
            { name: 'Basic Electronics', branch: 'ECE', semester: 1, btechYear: 1, type: 'Theory' },
            { name: 'Circuit Theory', branch: 'ECE', semester: 2, btechYear: 1, type: 'Theory' },
            { name: 'Analog Electronics', branch: 'ECE', semester: 2, btechYear: 1, type: 'Theory' },
            { name: 'Digital Electronics', branch: 'ECE', semester: 3, btechYear: 2, type: 'Theory' },
            { name: 'Microprocessors', branch: 'ECE', semester: 3, btechYear: 2, type: 'Theory' },
            { name: 'Signals & Systems', branch: 'ECE', semester: 4, btechYear: 2, type: 'Theory' },
            { name: 'Communication Systems', branch: 'ECE', semester: 4, btechYear: 2, type: 'Theory' },
            { name: 'VLSI Design', branch: 'ECE', semester: 5, btechYear: 3, type: 'Theory' },
            { name: 'Embedded Systems', branch: 'ECE', semester: 5, btechYear: 3, type: 'Theory' },
            { name: 'Antenna Theory', branch: 'ECE', semester: 6, btechYear: 3, type: 'Theory' },
            { name: 'Internet of Things', branch: 'ECE', semester: 6, btechYear: 3, type: 'Theory' },
            { name: 'Wireless Communication', branch: 'ECE', semester: 7, btechYear: 4, type: 'Theory' },
            { name: 'AI in Electronics', branch: 'ECE', semester: 7, btechYear: 4, type: 'Theory' },
            { name: 'Robotics', branch: 'ECE', semester: 8, btechYear: 4, type: 'Theory' },
            { name: 'Final Year Project', branch: 'ECE', semester: 8, btechYear: 4, type: 'Practical' },
        
            // EEE Subjects
            { name: 'Mathematics', branch: 'EEE', semester: 1, btechYear: 1, type: 'Theory' },
    { name: 'Physics', branch: 'EEE', semester: 1, btechYear: 1, type: 'Theory' },
    { name: 'Electrical Circuits', branch: 'EEE', semester: 2, btechYear: 1, type: 'Theory' },
    { name: 'Digital Logic Design', branch: 'EEE', semester: 2, btechYear: 1, type: 'Theory' },
    { name: 'Power Systems', branch: 'EEE', semester: 3, btechYear: 2, type: 'Theory' },
    { name: 'Electrical Machines', branch: 'EEE', semester: 3, btechYear: 2, type: 'Theory' },
    { name: 'Control Systems', branch: 'EEE', semester: 4, btechYear: 2, type: 'Theory' },
    { name: 'Power Electronics', branch: 'EEE', semester: 4, btechYear: 2, type: 'Theory' },
    { name: 'Renewable Energy', branch: 'EEE', semester: 5, btechYear: 3, type: 'Theory' },
    { name: 'Microcontrollers', branch: 'EEE', semester: 5, btechYear: 3, type: 'Theory' },
    { name: 'High Voltage Engineering', branch: 'EEE', semester: 6, btechYear: 3, type: 'Theory' },
    { name: 'Energy Management', branch: 'EEE', semester: 6, btechYear: 3, type: 'Theory' },
    { name: 'Electric Vehicles', branch: 'EEE', semester: 7, btechYear: 4, type: 'Theory' },
    { name: 'Smart Grid Technology', branch: 'EEE', semester: 7, btechYear: 4, type: 'Theory' },
    { name: 'Electrical Safety', branch: 'EEE', semester: 8, btechYear: 4, type: 'Theory' },
    { name: 'Final Year Project', branch: 'EEE', semester: 8, btechYear: 4, type: 'Practical' },
        
            // MECH Subjects
            { name: 'Mathematics', branch: 'MECH', semester: 1, btechYear: 1, type: 'Theory' },
            { name: 'Physics', branch: 'MECH', semester: 1, btechYear: 1, type: 'Theory' },
            { name: 'Engineering Drawing', branch: 'MECH', semester: 2, btechYear: 1, type: 'Practical' },
            { name: 'Thermodynamics', branch: 'MECH', semester: 2, btechYear: 1, type: 'Theory' },
            { name: 'Fluid Mechanics', branch: 'MECH', semester: 3, btechYear: 2, type: 'Theory' },
            { name: 'Manufacturing Processes', branch: 'MECH', semester: 3, btechYear: 2, type: 'Theory' },
            { name: 'Material Science', branch: 'MECH', semester: 4, btechYear: 2, type: 'Theory' },
            { name: 'Automobile Engineering', branch: 'MECH', semester: 5, btechYear: 3, type: 'Theory' },
            { name: 'CAD/CAM', branch: 'MECH', semester: 6, btechYear: 3, type: 'Practical' },
            { name: 'Robotics', branch: 'MECH', semester: 7, btechYear: 4, type: 'Theory' },
        
            // CIVIL Subjects
            { name: 'Mathematics', branch: 'CIVIL', semester: 1, btechYear: 1, type: 'Theory' },
            { name: 'Physics', branch: 'CIVIL', semester: 1, btechYear: 1, type: 'Theory' },
            { name: 'Surveying', branch: 'CIVIL', semester: 2, btechYear: 1, type: 'Practical' },
            { name: 'Structural Analysis', branch: 'CIVIL', semester: 3, btechYear: 2, type: 'Theory' },
            { name: 'Transportation Engineering', branch: 'CIVIL', semester: 4, btechYear: 2, type: 'Theory' },
            { name: 'Environmental Engineering', branch: 'CIVIL', semester: 5, btechYear: 3, type: 'Theory' },
            { name: 'Geotechnical Engineering', branch: 'CIVIL', semester: 6, btechYear: 3, type: 'Theory' },
            { name: 'Construction Management', branch: 'CIVIL', semester: 7, btechYear: 4, type: 'Theory' },
            { name: 'Smart City Design', branch: 'CIVIL', semester: 8, btechYear: 4, type: 'Theory' },
            { name: 'Final Year Project', branch: 'CIVIL', semester: 8, btechYear: 4, type: 'Practical' }
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
