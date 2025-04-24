const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const subjectRoutes = require('./routes/subjects');
const feedbackRoutes = require('./routes/feedback');
const ratingRoutes = require('./routes/rating'); 
const resetRatings = require('./routes/resetRatings');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();


const envFilePath = path.join(__dirname, '.env');
let apiEnabled = process.env.API_ENABLED === "true";

app.use((req, res, next) => {
    if (!apiEnabled && req.path !== "/api/toggle") {
        return res.status(503).json({ message: "Server is under maintenance." });
    }
    next();
});

app.get('/', (req, res) => res.send('Server working as expected...'));

app.post('/api/toggle', (req, res) => {
    apiEnabled = !apiEnabled;
    let envContent = fs.readFileSync(envFilePath, 'utf8');
    if (envContent.includes("API_ENABLED=")) {
        envContent = envContent.replace(/API_ENABLED=.*/, `API_ENABLED=${apiEnabled}`);
    } else {
        envContent += `\nAPI_ENABLED=${apiEnabled}`;
    }
    fs.writeFileSync(envFilePath, envContent);
    res.json({ message: `Server ${apiEnabled ? "is live now." : "is under maintenance."}` });
});

app.use('/api/auth', authRoutes);
app.use('/api/resetRatings', resetRatings);
app.use('/api/subjects', subjectRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/ratings', ratingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
