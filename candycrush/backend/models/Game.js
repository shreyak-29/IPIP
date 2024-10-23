// server/models/Game.js
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    userId: {
        type: String, // Change from ObjectId to String
        required: true
    },
    board: {
        type: [[Number]], // Assuming your board is a 2D array of numbers
        required: true
    },
    // Add other fields as necessary
});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
