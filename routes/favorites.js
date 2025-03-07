const express = require('express');
const Favorite = require('../models/favorite');
const router = express.Router();

// Get all favorites
router.get('/', async (req, res) => {
  try {
    const favorites = await Favorite.getAllFavorites();
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a favorite by ID
router.get('/:id', async (req, res) => {
  try {
    const favorite = await Favorite.getFavoriteById(req.params.id);
    if (!favorite) return res.status(404).json({ message: 'Favorite not found' });
    res.json(favorite);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all favorite players for a user
router.get('/players/:user_id', async (req, res) => {
  try {
    const favorites = await Favorite.getFavoritePlayersByUser(req.params.user_id);
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all favorite teams for a user
router.get('/teams/:user_id', async (req, res) => {
  try {
    const favorites = await Favorite.getFavoriteTeamsByUser(req.params.user_id);
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a favorite player
router.post('/players', async (req, res) => {
  try {
    const { user_id, player_id } = req.body;
    if (!user_id || !player_id) {
      return res.status(400).json({ message: 'User ID and Player ID are required' });
    }
    const favorite = await Favorite.createFavoritePlayer(user_id, player_id);
    res.status(201).json(favorite);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a favorite team
router.post('/teams', async (req, res) => {
  try {
    const { user_id, team_id } = req.body;
    if (!user_id || !team_id) {
      return res.status(400).json({ message: 'User ID and Team ID are required' });
    }
    const favorite = await Favorite.createFavoriteTeam(user_id, team_id);
    res.status(201).json(favorite);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove a favorite
router.delete('/', async (req, res) => {
    try {
      const { user_id, player_id, team_id } = req.body;
      const message = await Favorite.deleteFavorite(user_id, player_id, team_id);
      res.json(message);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

module.exports = router;
