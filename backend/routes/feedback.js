const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");
const Rating = require("../models/Rating");

router.post("/rating", async (req, res) => {
    try {
        const { ratings, branch } = req.body;  

        if (!branch || !["CSE1", "CSE2", "CSE3", "CSE4"].includes(branch)) {
            return res.status(400).json({ error: "Invalid or missing branch" });
        }

        if (!Array.isArray(ratings) || ratings.length === 0) {
            return res.status(400).json({ error: "Invalid ratings input" });
        }

        let ratingDocs = [];
        let subjectUpdates = {};

        for (const { subjectName, rating, message } of ratings) {
            if (!message || typeof message !== "string") {
                return res.status(400).json({ error: "Message is required and must be a string" });
            }

            const subject = await Subject.findOne({ name: subjectName, branch });

            if (!subject) {
                return res.status(404).json({ error: `Subject ${subjectName} not found for branch ${branch}` });
            }
     
            const subjectId = subject._id;

            ratingDocs.push({ subjectId, branch, rating, message });

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

        await Rating.insertMany(ratingDocs);

        const bulkOperations = Object.keys(subjectUpdates).map(subjectId => ({
            updateOne: {
                filter: { _id: subjectId, branch },
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
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

