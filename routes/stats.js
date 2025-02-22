const express = require('express');
const { getAllStats, getStatById, addStat } = require('../models/stat');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const stats = await getAllStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const stat = await getStatById(req.params.id);
    if (!stat) return res.status(404).json({ message: 'Stat not found' });
    res.json(stat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
    const { player_id, game_id, points, assists, rebounds } = req.body;
    try {
      const stat = await addStat(player_id, game_id, points, assists, rebounds);
      res.status(201).json(stat);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});


module.exports = router;
