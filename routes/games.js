const express = require('express');
const { getAllGames, getGameById, addGame } = require('../models/game');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const games = await getAllGames();
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const game = await getGameById(req.params.id);
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
    const { home_team_id, away_team_id, game_date } = req.body;
    try {
      const game = await addGame(home_team_id, away_team_id, game_date);
      res.status(201).json(game);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

module.exports = router;
