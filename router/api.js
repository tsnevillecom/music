const express = require('express');
const router = new express.Router();
const authenticate = require('../middleware/auth');

router.get('/api/home', (req, res) => {
  res.send('Welcome!');
});

router.get('/api/profile', authenticate, async (req, res) => {
  res.json({
    test: 123,
    test1: 234
  });
});

module.exports = router;
