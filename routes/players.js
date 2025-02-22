const express = require('express');
const { getAllPlayers, getPlayerById, addPlayer } = require('../models/player');
const router = express.Router();

// Get all players
router.get('/', async (req, res) => {
  try {
    const players = await getAllPlayers();
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get player by ID
router.get('/:id', async (req, res) => {
  try {
    const player = await getPlayerById(req.params.id);
    if (!player) return res.status(404).json({ message: 'Player not found' });
    res.json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new player
router.post('/', async (req, res) => {
  const { name, team_id, stats } = req.body;
  try {
    const player = await addPlayer(name, team_id, stats);
    res.status(201).json(player);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
