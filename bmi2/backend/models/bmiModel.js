const mongoose = require('mongoose');

const bmiSchema = new mongoose.Schema({
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  bmi: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BMI', bmiSchema);
