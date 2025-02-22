const express = require('express');
const { getAllTeams, getTeamById, addTeam } = require('../models/team');
const router = express.Router();

// Get all teams
router.get('/', async (req, res) => {
  try {
    const teams = await getAllTeams();
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a certain team
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const teams = await getTeamById(id);
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new team
router.post('/', async (req, res) => {
  const { name, city } = req.body;
  try {
    const team = await createTeam(name, city);
    res.status(201).json(team);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
