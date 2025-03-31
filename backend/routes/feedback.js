const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");
const Rating = require("../models/Rating");

router.post("/rating", async (req, res) => {
    try {
        const { ratings, branch, year, semester } = req.body;

        if (!branch || !["CSE1", "CSE2", "CSE3", "CSE4"].includes(branch)) {
            return res.status(400).json({ error: "Branch is required and must be CSE1, CSE2, CSE3, or CSE4." });
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
        
        const subjects = await Subject.find({ name: { $in: subjectNames }, branch, year, semester });

        const subjectMap = new Map(subjects.map(sub => [sub.name, sub]));

        let ratingDocs = [];
        let subjectUpdates = {};

        for (const { subjectName, rating, message } of ratings) {
            if (!message || typeof message !== "string") {
                return res.status(400).json({ error: "Message is required and must be a string." });
            }

            const subject = subjectMap.get(subjectName);
            if (!subject) {
                return res.status(404).json({ error: `Subject ${subjectName} not found for branch ${branch}, year ${year}, and semester ${semester}` });
            }

            const subjectId = subject._id;

            ratingDocs.push({ subjectId, branch, year, semester, rating, message });

            if (!subjectUpdates[subjectId]) {
                subjectUpdates[subjectId] = {
                    totalRatings: subject.totalRatings,
                    sumOfRatings: subject.sumOfRatings,
                    messages: [...subject.messages]
                };
            }

            subjectUpdates[subjectId].totalRatings += 1;
            subjectUpdates[subjectId].sumOfRatings += rating;
            subjectUpdates[subjectId].messages.push(message);
        }

        // Insert new ratings
        await Rating.insertMany(ratingDocs);

        // Prepare bulk update operations
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

        res.status(201).json({ message: "Ratings submitted successfully", ratings: ratingDocs });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;