/* const express = require("express");
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

module.exports = router; */


const express = require("express");
const Subject = require("../models/Subject");
const router = express.Router();

router.get("/average/:subjectId", async (req, res) => {
    try {
        const { subjectId } = req.params;
        const { branch } = req.query;  // Accept branch as a query parameter

        // Validate branch
        const validBranches = ["CSE1", "CSE2", "CSE3", "CSE4"];
        if (!branch || !validBranches.includes(branch)) {
            return res.status(400).json({ message: "Invalid or missing branch" });
        }

        // Find the subject in the given branch
        const subject = await Subject.findOne({ _id: subjectId, branch });

        if (!subject) {
            return res.status(404).json({ message: `Subject not found for branch ${branch}` });
        }

        res.json({
            subjectId: subjectId,
            subject: subject.name,
            branch: subject.branch,
            averageRating: subject.averageRating.toFixed(2) || 0,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
