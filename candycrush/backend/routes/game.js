// server/routes/game.js
const express = require('express');
const Game = require('../models/Game.js'); // Make sure this path is correct

const router = express.Router();

// GET route to fetch game data for a specific user
router.get('/:userId', async (req, res) => {
    try {
        const game = await Game.findOne({ userId: req.params.userId });
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.json(game); // Send the game data back to the client
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching game data' });
    }
});

module.exports = router;
