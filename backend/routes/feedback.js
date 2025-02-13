const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");
const Rating = require("../models/Rating");

// Submit multiple ratings
router.post("/rating", async (req, res) => {
    try {
        const { studentId, ratings } = req.body; // ratings is an array of { subjectId, rating }

        if (!Array.isArray(ratings) || ratings.length === 0) {
            return res.status(400).json({ error: "Invalid ratings input" });
        }

        let ratingDocs = []; // Array to store rating documents for batch insertion
        let updateOperations = []; // Array to store update operations for subjects

        for (const { subjectId, rating } of ratings)
        {
            // Validate subject existence
            const subject = await Subject.findById(subjectId);
            if (!subject) return res.status(404).json({ error: `Subject with ID ${subjectId} not found`});

            // Prepare new rating document
            ratingDocs.push({ studentId, subjectId, rating });

            // Update subject's rating statistics
            subject.totalRatings += 1;
            subject.sumOfRatings += rating;
            subject.averageRating = subject.sumOfRatings / subject.totalRatings;

            // Store update operation for batch processing
            updateOperations.push(subject.save());
        }

        // Insert all ratings at once for efficiency
        await Rating.insertMany(ratingDocs);
        // Execute all subject updates in parallel
        await Promise.all(updateOperations);

        res.status(201).json({ message: "Ratings submitted successfully", ratings: ratingDocs });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;