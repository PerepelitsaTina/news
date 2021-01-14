const express = require('express');
const db = require('../models/index');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const news = await db.News.findAll();
    res.send(news);
  } catch (error) {
    res.send(error)
  }
});

module.exports = router;
