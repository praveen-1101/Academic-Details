const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const subjectRoutes = require('./routes/subjects');
const feedbackRoutes = require('./routes/feedback');
const ratingRoutes = require('./routes/rating');  

require('dotenv').config();

const app = express();
app.use(express.json());

// Connect to Database
connectDB();

app.get('/', (req, res) => res.send('API is running...'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/ratings', ratingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
