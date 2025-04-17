const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");
const Rating = require("../models/Rating");

router.post("/rating", async (req, res) => {
    try {
        const { ratings, branch, year, semester } = req.body;

        if (!branch || ![
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
          ]
          .includes(branch)) {
            return res.status(400).json({ error: "Branch is invalid" });
        }

        if (!year || ![1, 2, 3, 4].includes(year)) {
            return res.status(400).json({ error: "Year is required and must be 1, 2, 3, or 4." });
        }

        if (!semester || ![1, 2].includes(semester)) {
            return res.status(400).json({ error: "Semester is required and must be 1 or 2." });
        }

        if (!Array.isArray(ratings) || ratings.length === 0) {
            return res.status(400).json({ error: "Ratings array is required and must contain at least one rating." });
        }

        const subjectNames = ratings.map(r => r.subjectName);
        
        let subjects = await Subject.find({ name: { $in: subjectNames }, branch, year, semester });
        
        const subjectMap = new Map(subjects.map(sub => [sub.name, sub]));

        let newSubjects = [];
        let ratingDocs = [];
        let subjectUpdates = {};

        for (const { subjectName, rating, message } of ratings) {
            if (!message || typeof message !== "string") {
                return res.status(400).json({ error: "Message is required and must be a string." });
            }

            let subject = subjectMap.get(subjectName);
            
            if (!subject) {
                subject = new Subject({ name: subjectName, branch, year, semester, totalRatings: 0, sumOfRatings: 0, messages: [] });
                newSubjects.push(subject);
                subjectMap.set(subjectName, subject);
            }

            const subjectId = subject._id;

            ratingDocs.push({ subjectId, subjectName, branch, year, semester, rating, message });

            if (!subjectUpdates[subjectId]) {
                subjectUpdates[subjectId] = {
                    totalRatings: subject.totalRatings,
                    sumOfRatings: subject.sumOfRatings,
                    messages: subject.messages
                };
            }

            subjectUpdates[subjectId].totalRatings += 1;
            subjectUpdates[subjectId].sumOfRatings += rating;
            subjectUpdates[subjectId].messages.push(message);
        }

        if (newSubjects.length > 0) {
            const insertedSubjects = await Subject.insertMany(newSubjects);
            insertedSubjects.forEach(sub => subjectMap.set(sub.name, sub));
        }

        await Rating.insertMany(ratingDocs);

        const bulkOperations = Object.keys(subjectUpdates).map(subjectId => ({
            updateOne: {
                filter: { _id: subjectId },
                update: {
                    $set: {
                        totalRatings: subjectUpdates[subjectId].totalRatings,
                        sumOfRatings: subjectUpdates[subjectId].sumOfRatings,
                        averageRating: subjectUpdates[subjectId].sumOfRatings / subjectUpdates[subjectId].totalRatings,
                        messages: subjectUpdates[subjectId].messages
                    }
                }
            }
        }));

        if (bulkOperations.length > 0) {
            await Subject.bulkWrite(bulkOperations);
        }

        res.status(201).json({ 
            message: "Ratings submitted successfully", 
            ratings: ratingDocs.map(doc => ({
                subjectId: doc.subjectId,
                subjectName: doc.subjectName,
                branch: doc.branch,
                year: doc.year,
                semester: doc.semester,
                rating: doc.rating,
                message: doc.message
            }))
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
