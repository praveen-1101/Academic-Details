/* const express = require("express");
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

 */


const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");
const Rating = require("../models/Rating");
const natural = require("natural");

const stemmer = natural.PorterStemmer; // Stemming for feedback processing

// Function to process and group similar feedback messages
function processFeedback(feedbacks) {
    const groupedFeedback = new Map();

    feedbacks.forEach((feedback) => {
        const stemmedFeedback = stemmer.tokenizeAndStem(feedback).join(" ");

        let matchedKey = null;
        for (let key of groupedFeedback.keys()) {
            const similarity = natural.JaroWinklerDistance(stemmedFeedback, key);
            if (similarity > 0.7) { // Threshold for similarity
                matchedKey = key;
                break;
            }
        }

        if (matchedKey) {
            groupedFeedback.set(matchedKey, {
                count: groupedFeedback.get(matchedKey).count + 1,
                originalExamples: [...groupedFeedback.get(matchedKey).originalExamples, feedback],
            });
        } else {
            groupedFeedback.set(stemmedFeedback, {
                count: 1,
                originalExamples: [feedback],
            });
        }
    });

    return Array.from(groupedFeedback.entries())
        .sort((a, b) => b[1].count - a[1].count)
        .map(([representative, value]) => ({
            representative,
            count: value.count,
            originalExamples: value.originalExamples,
        }));
}

// GET Route to fetch rating reviews by year, semester, and branch
router.get("/review", async (req, res) => {
    try {
        const { year, semester, branch } = req.query;

        if (!year || !semester || !branch) {
            return res.status(400).json({ message: "Year, semester, and branch are required" });
        }

        // Fetch all subjects for the given year, semester, and branch
        const subjects = await Subject.find({ year, semester, branch });

        if (subjects.length === 0) {
            return res.status(404).json({ message: "No subjects found for the given filters" });
        }

        const subjectIds = subjects.map(subject => subject._id);
        
        // Fetch all ratings related to the subjects
        const ratings = await Rating.find({ subjectId: { $in: subjectIds }, branch });

        // Prepare output for each subject
        const results = subjects.map(subject => {
            const subjectRatings = ratings.filter(rating => rating.subjectId.toString() === subject._id.toString());

            // Count ratings (4, 3, 2, 1)
            const ratingCounts = { 4: 0, 3: 0, 2: 0, 1: 0 };
            const feedbacks = [];

            subjectRatings.forEach(rating => {
                ratingCounts[rating.rating] += 1;
                feedbacks.push(rating.message);
            });

            // Process feedbacks using NLP
            const summarizedFeedback = processFeedback(feedbacks);

            return {
                subjectId: subject._id,
                subjectName: subject.name,
                facultyName: subject.faculty || "Unknown",
                averageRating: subject.averageRating.toFixed(2),
                ratingCounts,
                summarizedFeedback
            };
        });

        res.json(results);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
