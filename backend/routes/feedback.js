/* const express = require('express');
const Rating = require('../models/Rating');
const Subject = require('../models/Subject');

const router = express.Router();

// Submit Rating
router.post('/rate', async (req, res) => {
    const { subjectId, userId, rating } = req.body;

    let subjectRating = await Rating.findOne({ subject: subjectId, user: userId });

    if (subjectRating) {
        subjectRating.rating = (subjectRating.rating * subjectRating.count + rating) / (subjectRating.count + 1);
        subjectRating.count += 1;
        await subjectRating.save();
    } else {
        subjectRating = new Rating({ subject: subjectId, user: userId, rating, count: 1 });
        await subjectRating.save();
    }

    res.json({ message: 'Rating submitted successfully!' });
});

module.exports = router;
 */

/* 
const express = require('express');
const Rating = require('../models/Rating');
const Subject = require('../models/Subject');
const User = require('../models/User'); // Assuming there's a User model

const router = express.Router();

// Submit Rating
router.post('/rate', async (req, res) => {
    const { subjectId, userId, rating } = req.body;

    // ✅ Check if rating is between 1 and 5
    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // ✅ Check if subject exists
    const subjectExists = await Subject.findById(subjectId);
    if (!subjectExists) {
        return res.status(404).json({ message: 'Invalid subject ID' });
    }

    // ✅ Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
        return res.status(404).json({ message: 'Invalid user ID' });
    }

    // ✅ Check if rating already exists
    let subjectRating = await Rating.findOne({ subject: subjectId, user: userId });

    if (subjectRating) {
        // Update rating using weighted average
        subjectRating.rating = (subjectRating.rating * subjectRating.count + rating) / (subjectRating.count + 1);
        subjectRating.count += 1;
        await subjectRating.save();
    } else {
        subjectRating = new Rating({ subject: subjectId, user: userId, rating, count: 1 });
        await subjectRating.save();
    }


    const allRatings = await Rating.find({ subject: subjectId });
    const totalRatings = allRatings.reduce((sum, r) => sum + (r.rating * r.count), 0);
    const totalCount = allRatings.reduce((sum, r) => sum + r.count, 0);
    const averageRating = totalCount > 0 ? (totalRatings / totalCount).toFixed(2) : 0;

    res.json({ message: 'Rating submitted successfully!' , 
        averageRating: parseFloat(averageRating) 
        
    });
});

module.exports = router;
 */

/* 
const express = require('express');
const Rating = require('../models/Rating');
const Subject = require('../models/Subject');
const User = require('../models/User');

const router = express.Router();

// Submit Rating & Return Average Ratings
router.post('/rate', async (req, res) => {
    try {
        const { subjectId, userId, rating } = req.body;

        // ✅ Validate rating
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }

        // ✅ Validate subject
        const subjectExists = await Subject.findById(subjectId);
        if (!subjectExists) {
            return res.status(404).json({ message: 'Invalid subject ID' });
        }

        // ✅ Validate user
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'Invalid user ID' });
        }

        // ✅ Check if the user has already rated this subject
        let subjectRating = await Rating.findOne({ subject: subjectId, user: userId });

        if (subjectRating) {
            // Update rating using weighted average
            subjectRating.rating = (subjectRating.rating * subjectRating.count + rating) / (subjectRating.count + 1);
            subjectRating.count += 1;
            await subjectRating.save();
        } else {
            subjectRating = new Rating({ subject: subjectId, user: userId, rating, count: 1 });
            await subjectRating.save();
        }

        // ✅ Get average rating for the subject
        const avgRatingForSubject = await Rating.aggregate([
            { $match: { subject: subjectId } },
            { $group: { _id: "$subject", avgRating: { $avg: "$rating" } } }
        ]);

        // ✅ Get average rating for the subject filtered by branch
        const avgRatingForBranch = await Rating.aggregate([
            { 
                $lookup: {
                    from: "subjects",
                    localField: "subject",
                    foreignField: "_id",
                    as: "subjectDetails"
                }
            },
            { $unwind: "$subjectDetails" },
            { $match: { "subjectDetails.branch": subjectExists.branch } },
            { $group: { _id: subjectId, avgRating: { $avg: "$rating" } } }
        ]);

        // ✅ Get average rating grouped by subject and branch
        const avgRatingByBranch = await Rating.aggregate([
            { 
                $lookup: {
                    from: "subjects",
                    localField: "subject",
                    foreignField: "_id",
                    as: "subjectDetails"
                }
            },
            { $unwind: "$subjectDetails" },
            { 
                $group: { 
                    _id: { subject: "$subject", branch: "$subjectDetails.branch" },
                    avgRating: { $avg: "$rating" }
                }
            },
            { 
                $project: { 
                    _id: 0,
                    subjectId: "$_id.subject",
                    branch: "$_id.branch",
                    avgRating: 1
                }
            }
        ]);

        res.json({
            message: "Rating submitted successfully!",
            avgRatingForSubject: avgRatingForSubject.length > 0 ? avgRatingForSubject[0].avgRating.toFixed(2) : "No ratings yet",
            avgRatingForBranch: avgRatingForBranch.length > 0 ? avgRatingForBranch[0].avgRating.toFixed(2) : "No ratings yet",
            avgRatingByBranch
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
 */

/* 
const express = require('express');
const Rating = require('../models/Rating');
const Subject = require('../models/Subject');
const User = require('../models/User');

const router = express.Router();

// 🔹 Submit Rating & Store Average Ratings
router.post('/rate', async (req, res) => {
    try {
        const { subjectId, userId, rating } = req.body;

        // ✅ Validate rating
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }

        // ✅ Validate subject
        const subjectExists = await Subject.findById(subjectId);
        if (!subjectExists) {
            return res.status(404).json({ message: 'Invalid subject ID' });
        }

        // ✅ Validate user
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'Invalid user ID' });
        }

        // ✅ Check if the user has already rated this subject
        let subjectRating = await Rating.findOne({ subject: subjectId, user: userId });

        if (subjectRating) {
            // Update total rating and count
            subjectRating.totalRating += rating;
            subjectRating.studentCount += 1;
            subjectRating.averageRating = subjectRating.totalRating / subjectRating.studentCount;
            await subjectRating.save();
        } else {
            subjectRating = new Rating({
                subject: subjectId,
                user: userId,
                totalRating: rating,
                studentCount: 1,
                averageRating: rating
            });
            await subjectRating.save();
        }

        res.json({
            message: "Successfully submitted the rating for all subjects!",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// 🔹 Fetch Average Rating for a Subject
router.get('/average-rating', async (req, res) => {
    try {
        const { subjectId } = req.query;

        if (!subjectId) {
            return res.status(400).json({ message: 'Subject ID is required' });
        }

        // ✅ Get the stored average rating
        const ratingData = await Rating.findOne({ subject: subjectId });

        if (!ratingData) {
            return res.json({ subjectId, averageRating: "No ratings yet." });
        }

        res.json({
            subjectId,
            averageRating: ratingData.averageRating.toFixed(2)
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
*/


const express = require("express");
const Rating = require("../models/Rating");
const Subject = require("../models/Subject");
const User = require("../models/User");

const router = express.Router();

// ✅ Submit Ratings for Multiple Subjects
router.post("/rate", async (req, res) => {
    try {
        const { userId, ratings } = req.body; // ratings = [{subjectId, rating}]

        // Validate user
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: "Invalid user ID" });
        }

        for (const { subjectId, rating } of ratings) {
            // Validate rating range
            if (rating < 1 || rating > 5) {
                return res.status(400).json({ message: "Rating must be between 1 and 5" });
            }

            // Validate subject
            const subjectExists = await Subject.findById(subjectId);
            if (!subjectExists) {
                return res.status(404).json({ message: `Invalid subject ID: ${subjectId}` });
            }

            // ✅ Check if user has already rated this subject
            let userRating = await Rating.findOne({ subject: subjectId, user: userId });

            if (userRating) {
                // Update existing rating
                userRating.rating = rating;
                await userRating.save();
            } else {
                // Create new rating entry
                userRating = new Rating({
                    user: userId,
                    subject: subjectId,
                    rating: rating
                });
                await userRating.save();
            }
            
        }

        for (const { subjectId } of ratings) {
            const subjectRatings = await Rating.find({ subject: subjectId });
            const totalRating = subjectRatings.reduce((sum, r) => sum + r.rating, 0);
            const studentCount = subjectRatings.length;
            const averageRating = studentCount > 0 ? (totalRating / studentCount).toFixed(2) : "0.00";

            // ✅ Update Subject's average rating
            await Subject.findByIdAndUpdate(subjectId, { averageRating, studentCount });
        }

        res.json({ message: "Ratings submitted successfully!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
