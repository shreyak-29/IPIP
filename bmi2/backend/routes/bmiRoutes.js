const express = require('express');
const router = express.Router();
const BMI = require('../models/bmiModel');

// Calculate and Save BMI
router.post('/calculate', async (req, res) => {
  const { height, weight } = req.body;

  if (!height || !weight) {
    return res.status(400).json({ error: 'Height and weight are required' });
  }

  const bmi = (weight / (height * height)).toFixed(2);

  try {
    const newBMI = new BMI({ height, weight, bmi });
    await newBMI.save();
    res.status(201).json(newBMI);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save BMI' });
  }
});

// Get All BMI Records
router.get('/records', async (req, res) => {
  try {
    const records = await BMI.find();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch records' });
  }
});

module.exports = router;
