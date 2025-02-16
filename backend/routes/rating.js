const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");
const Rating = require("../models/Rating");

router.get("/average/:subjectId", async (req, res) => {
    try {
        const { subjectId } = req.params;
        const { branch } = req.query;  
        const validBranches = ["CSE1", "CSE2", "CSE3", "CSE4"];
        if (!branch || !validBranches.includes(branch)) {
            return res.status(400).json({ message: "Invalid or missing branch" });
        }

        const subject = await Subject.findOne({ _id: subjectId, branch });

        if (!subject) {
            return res.status(404).json({ message: `Subject not found for branch ${branch}` });
        }

        const ratings = await Rating.find({ subjectId, branch }).select("message -_id");

        const feedbackMessages = ratings.map(rating => rating.message);

        res.json({
            subjectId: subjectId,
            subject: subject.name,
            branch: subject.branch,
            averageRating: subject.averageRating.toFixed(2) || 0,
            feedback: feedbackMessages 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;

