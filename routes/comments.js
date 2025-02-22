const express = require('express');
const { getAllComments, getCommentById, addComment } = require('../models/comment');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const comments = await getAllComments();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const comment = await getCommentById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
    try {
      const { user_id, game_id, content } = req.body;
      if (!user_id || !game_id || !content) {
        return res.status(400).json({ message: 'User ID, Game ID, and Content are required' });
      }
      const comment = await addComment(user_id, game_id, content);
      res.status(201).json(comment);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

module.exports = router;
