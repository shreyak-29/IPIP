const express = require('express');
const Game = require('../models/Game');
const router = express.Router();

// Save game state
router.post('/save', async (req, res) => {
  try {
    const game = new Game(req.body);
    await game.save();
    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Load game state
router.get('/load', async (req, res) => {
  try {
    const game = await Game.findOne().sort({ _id: -1 });
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
