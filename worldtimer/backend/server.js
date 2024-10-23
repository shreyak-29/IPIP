const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// App configuration
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/worldTimerDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// City Schema and Model
const citySchema = new mongoose.Schema({
  name: String,
  timezone: String
});

const City = mongoose.model('City', citySchema);

// Function to initialize sample cities if the database is empty
const initializeCities = async () => {
  const count = await City.countDocuments();
  if (count === 0) {
    const sampleCities = [
      { name: 'New York', timezone: 'America/New_York' },
      { name: 'London', timezone: 'Europe/London' },
      { name: 'Tokyo', timezone: 'Asia/Tokyo' },
      { name: 'Kolkata', timezone: 'Asia/Kolkata' }
    ];
    await City.insertMany(sampleCities);
    console.log('Sample cities added.');
  } else {
    console.log('Cities already exist in the database.');
  }
};

// Initialize cities on server start
initializeCities();

// Get cities from database
app.get('/api/cities', async (req, res) => {
  const cities = await City.find();
  res.json(cities);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
