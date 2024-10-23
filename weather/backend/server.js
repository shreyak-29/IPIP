const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/bmiDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// City schema
const citySchema = new mongoose.Schema({
  name: String,
  temperature: String,
  description: String,
});

const City = mongoose.model('City', citySchema);

// Routes
app.get('/cities', async (req, res) => {
  const cities = await City.find();
  res.json(cities);
});

app.post('/cities', async (req, res) => {
  const city = new City(req.body);
  await city.save();
  res.status(201).json(city);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
