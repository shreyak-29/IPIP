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
mongoose.connect('mongodb://localhost:27017/bmiDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Schema and Model
const timingSchema = new mongoose.Schema({
  elapsedTime: Number,
  timestamp: { type: Date, default: Date.now }
});

const Timing = mongoose.model('Timing', timingSchema);

// Routes
app.get('/api/timings', async (req, res) => {
  const timings = await Timing.find().sort({ timestamp: -1 });
  res.json(timings);
});

app.post('/api/timings', async (req, res) => {
  const newTiming = new Timing({ elapsedTime: req.body.elapsedTime });
  await newTiming.save();
  res.status(201).json(newTiming);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
