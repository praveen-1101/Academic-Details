const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const subjectRoutes = require('./routes/subjects');
const feedbackRoutes = require('./routes/feedback');
const ratingRoutes = require('./routes/rating');  
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

let apiEnabled = true;

app.use((req, res, next) => {
    if (!apiEnabled && req.path !== "/api/toggle") {
        return res.status(503).json({ message: "Server is under maintenance" });
    }
    next();
});

app.get('/', (req, res) => res.send('API is running...'));

app.post('/api/toggle', (req, res) => {
    apiEnabled = !apiEnabled;
    res.json({ message: `Server ${apiEnabled ? "is available now" : "is under maintenance"}` });
});

app.use('/api/auth', authRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/ratings', ratingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
