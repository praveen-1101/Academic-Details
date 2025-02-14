const express = require("express");
const Subject = require("../models/Subject");
const Rating = require("../models/Rating");
const router = express.Router();

router.get("/average/:subjectId", async (req, res) => {
    try {
        const { subjectId } = req.params;

        
        const subject = await Subject.findById(subjectId);

        if (!subject) {
            return res.status(404).json({ message: "Subject not found" });
        }

        res.json({
            subjectId: subjectId,
            subject: subject.name,
            averageRating: subject.averageRating.toFixed(2) || 0,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;