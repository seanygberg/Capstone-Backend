// Import dependencies
const express = require('express');
const cors = require('cors');
const axios = require('axios');

// Import route files
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const teamRoutes = require('./routes/teams');
const playerRoutes = require('./routes/players');
const gameRoutes = require('./routes/games');
const statRoutes = require('./routes/stats');
const commentRoutes = require('./routes/comments');
const favoriteRoutes = require('./routes/favorites');
const performanceRoutes = require('./routes/performances');

// Initialize app
const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// ESPN API URLs
const ESPN_URL = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard';
const ESPN_SUMMARY_URL = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/summary?event=';
const ESPN_TEAMS_URL = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams';

// ESPN Data Routes
app.get('/api/games', async (req, res) => {
  try {
    const response = await axios.get(ESPN_URL);
    const games = response.data.events.map((event) => ({
      id: event.id,
      date: event.date,
      home_team: event.competitions[0].competitors[0].team.displayName,
      home_score: event.competitions[0].competitors[0].score,
      away_team: event.competitions[0].competitors[1].team.displayName,
      away_score: event.competitions[0].competitors[1].score,
    }));

    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching games', error });
  }
});

app.get('/api/teams', async (req, res) => {
  try {
    const response = await axios.get(ESPN_TEAMS_URL);
    const teams = response.data.sports[0].leagues[0].teams.map((team) => ({
      id: team.team.id,
      name: team.team.displayName,
    }));

    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teams', error });
  }
});

app.get('/api/performances/:gameId', async (req, res) => {
  try {
    const response = await axios.get(`${ESPN_SUMMARY_URL}${req.params.gameId}`);
    const playerStats = response.data.boxscore.players.flatMap((team) => {
      return team.statistics.flatMap((stat) =>
        stat.athletes.map((athlete) => ({
          id: athlete.athlete.id,
          player: athlete.athlete.displayName,
          team: team.team.displayName,
          points: parseInt(athlete.stats[13]) || 0,
          assists: parseInt(athlete.stats[7]) || 0,
          rebounds: parseInt(athlete.stats[6]) || 0,
          steals: parseInt(athlete.stats[8]) || 0,
          blocks: parseInt(athlete.stats[9]) || 0,
        }))
      );
    });

    res.json(playerStats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching performances', error });
  }
});

// Other routes
app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/performances', performanceRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
