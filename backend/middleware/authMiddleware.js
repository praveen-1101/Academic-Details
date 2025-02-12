const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({ message: "Access Denied. No token provided.", success: false });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password"); // Exclude password

        if (!user) {
            return res.status(401).json({ message: "Invalid token. User not found.", success: false });
        }

        req.user = user; // Attach user details to request
        next(); // Proceed to next middleware or route

    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token.", success: false });
    }
};

module.exports = authMiddleware;
