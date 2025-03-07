const express = require('express');
const Game = require('../models/game');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const games = await Game.getAllGames();
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const game = await Game.getGameById(req.params.id);
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
    const { home_team_id, away_team_id, game_date } = req.body;
    try {
      const game = await Game.addGame(home_team_id, away_team_id, game_date);
      res.status(201).json(game);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

module.exports = router;
