const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  board: { type: Array, required: true },
  isXNext: { type: Boolean, required: true },
  winner: { type: String, default: null },
});

module.exports = mongoose.model('Game', gameSchema);
