/* const express = require('express');
const Subject = require('../models/Subject');

const router = express.Router();

// Get subjects based on branch & semester
router.get('/', async (req, res) => {
    const { branch, semester } = req.query;

    const subjects = await Subject.find({ branch, semester });
    res.json(subjects);
});

module.exports = router;
 */


const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");

// Fetch subjects based on branch, semester, and B.Tech year
router.get("/", async (req, res) => {
    try {
        const { branch, semester, btechYear } = req.query;

        // Allowed values for validation
        const validBranches = ["CSE", "ECE", "EEE", "IT", "MECH", "CIVIL"];
        const validSemesters = [1, 2, 3, 4, 5, 6, 7, 8];
        const validYears = [1, 2, 3, 4];

        // Validation for required parameters
        if (!branch || !semester || !btechYear) {
            return res.status(400).json({ error: "Branch, semester, and B.Tech year are required" });
        }

        // Validate branch, semester, and B.Tech year
        if (!validBranches.includes(branch.toUpperCase())) {
            return res.status(400).json({ error: "Invalid branch" });
        }
        if (!validSemesters.includes(parseInt(semester))) {
            return res.status(400).json({ error: "Invalid semester" });
        }
        if (!validYears.includes(parseInt(btechYear))) {
            return res.status(400).json({ error: "Invalid B.Tech year" });
        }

        // Fetch subjects based on criteria
        const subjects = await Subject.find({ branch, semester, btechYear });

        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
