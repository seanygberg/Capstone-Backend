const express = require('express');
const {
  getAllPerformances,
  getPerformanceById,
  addPerformance,
  setPerformance,
  removePerformance
} = require('../models/performance');

const router = express.Router();

// Get all performances
router.get('/', async (req, res) => {
  try {
    const performances = await getAllPerformances();
    res.json(performances);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a performance by ID
router.get('/:id', async (req, res) => {
  try {
    const performance = await getPerformanceById(req.params.id);
    if (!performance) return res.status(404).json({ message: 'Performance not found' });
    res.json(performance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new performance
router.post('/', async (req, res) => {
  try {
    const { player_id, game_id, points, assists, rebounds, steals, blocks } = req.body;
    const performance = await addPerformance(player_id, game_id, points, assists, rebounds, steals, blocks);
    res.status(201).json(performance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a performance
router.patch('/:id', async (req, res) => {
  try {
    const updates = req.body;
    const performance = await setPerformance(req.params.id, updates);
    res.json(performance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a performance
router.delete('/:id', async (req, res) => {
  try {
    const message = await removePerformance(req.params.id);
    res.json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
