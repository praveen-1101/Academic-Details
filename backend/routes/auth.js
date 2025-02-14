const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const generateTokens = require('../utils/generateTokens');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({
            message: 'Login unsuccessful: Incorrect username',
            success: false
        });
    }

    if (user.password !== password) {
        return res.status(400).json({
            message: 'Login unsuccessful: Incorrect password',
            success: false
        });
    }

    const tokens = generateTokens(user._id);

    res.json({
        message: 'Logged in successfully!',
        success: true,
        user: {
            userId: user._id,
            username: user.username,
            password: password,
            name: user.name
        },
        tokens
    });
});

module.exports = router;
