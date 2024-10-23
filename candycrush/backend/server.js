// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const gameRoutes = require('./routes/game'); // Import the game routes

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/game', gameRoutes); // Make sure this line is included

mongoose.connect("mongodb://127.0.0.1:27017/bmiDB", 
    { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB connection error:', err));
    

app.get('/', (req, res) => {
    res.send('Candy Crush Clone API');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
