const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");

router.get("/", async (req, res) => {
    try {
        const { branch, semester, year } = req.query;

        const validBranches = ["CSE", "ECE", "EEE", "IT", "MECH", "CIVIL", "ECM"];
        const validSemesters = [1, 2 ];
        const validYears = [1, 2, 3, 4];

        if (!branch || !semester || !year) {
            return res.status(400).json({ error: "Branch, semester, and B.Tech year are required" });
        }

        if (!validBranches.includes(branch.toUpperCase())) {
            return res.status(400).json({ error: "Invalid branch" });
        }
        if (!validSemesters.includes(parseInt(semester))) {
            return res.status(400).json({ error: "Invalid semester" });
        }
        if (!validYears.includes(parseInt(year))) {
            return res.status(400).json({ error: "Invalid B.Tech year" });
        }

        const subjects = await Subject.find({ branch, semester, year });

        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
