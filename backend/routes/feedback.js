/* const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");
const Rating = require("../models/Rating");

router.post("/rating", async (req, res) => {
    try {

        const { ratings } = req.body; 

        if (!Array.isArray(ratings) || ratings.length === 0) {
            return res.status(400).json({ error: "Invalid ratings input" });
        }

        let ratingDocs = []; 
        let subjectUpdates = {};

        for (const { subjectId, rating } of ratings) {
    
            const subject = await Subject.findById(subjectId);
            if (!subject) {
                return res.status(404).json({ error: `Subject with ID ${subjectId} not found` });
            }

            
            ratingDocs.push({ subjectId, rating });

           
            if (!subjectUpdates[subjectId]) {
                subjectUpdates[subjectId] = { totalRatings: subject.totalRatings, sumOfRatings: subject.sumOfRatings };
            }

            subjectUpdates[subjectId].totalRatings += 1;
            subjectUpdates[subjectId].sumOfRatings += rating;
        }

        await Rating.insertMany(ratingDocs);

        const bulkOperations = Object.keys(subjectUpdates).map(subjectId => ({
            updateOne: {
                filter: { _id: subjectId },
                update: {
                    totalRatings: subjectUpdates[subjectId].totalRatings,
                    sumOfRatings: subjectUpdates[subjectId].sumOfRatings,
                    averageRating: subjectUpdates[subjectId].sumOfRatings / subjectUpdates[subjectId].totalRatings
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
 */





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

        for (const { subjectId, rating } of ratings) {
            const subject = await Subject.findOne({ _id: subjectId, branch });

            if (!subject) {
                return res.status(404).json({ error: `Subject with ID ${subjectId} not found for branch ${branch}` });
            }

            ratingDocs.push({ subjectId, branch, rating });

            if (!subjectUpdates[subjectId]) {
                subjectUpdates[subjectId] = { 
                    totalRatings: subject.totalRatings, 
                    sumOfRatings: subject.sumOfRatings 
                };
            }

            subjectUpdates[subjectId].totalRatings += 1;
            subjectUpdates[subjectId].sumOfRatings += rating;
        }

        await Rating.insertMany(ratingDocs);

        const bulkOperations = Object.keys(subjectUpdates).map(subjectId => ({
            updateOne: {
                filter: { _id: subjectId, branch },
                update: {
                    /* totalRatings: subjectUpdates[subjectId].totalRatings,
                    sumOfRatings: subjectUpdates[subjectId].sumOfRatings,
                    averageRating: subjectUpdates[subjectId].sumOfRatings / subjectUpdates[subjectId].totalRatings */
                    $set: {  // ✅ Ensure update works correctly
                        totalRatings: subjectUpdates[subjectId].totalRatings,
                        sumOfRatings: subjectUpdates[subjectId].sumOfRatings,
                        averageRating: subjectUpdates[subjectId].sumOfRatings / subjectUpdates[subjectId].totalRatings
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
