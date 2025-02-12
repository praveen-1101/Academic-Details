const express = require("express");
const Subject = require("../models/Subject");
const Rating = require("../models/Rating");
const router = express.Router();
/* 
router.get("/average-rating/:subjectId", async (req, res) => {
    try {
        const { subjectId } = req.params;

        // Get all ratings for the subject
        const ratings = await Rating.find({ subject: subjectId });

        if (!ratings.length) {
            return res.status(404).json({ message: "No ratings found for this subject" });
        }

        // Calculate the average rating
        const totalRating = ratings.reduce((sum, r) => sum + r.rating, 0);
        const averageRating = totalRating / ratings.length;

        res.json({
            subjectId: subjectId,
            averageRating: averageRating.toFixed(2)
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router; */


router.get("/average-rating/:subjectId", async (req, res) => {
    try {
        const { subjectId } = req.params;

        // Fetch subject details including computed average rating
        const subject = await Subject.findById(subjectId);

        if (!subject) {
            return res.status(404).json({ message: "Subject not found" });
        }

        res.json({
            subjectId: subjectId,
            averageRating: subject.averageRating || 0,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;