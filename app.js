// Import dependencies
const express = require('express');
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
app.use('/auth', authRoutes);

// Routes
app.use('/api/users', userRoutes);

// Protected routes
app.use('/api/teams', teamRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/performances', performanceRoutes)

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
