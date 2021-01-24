const express = require('express');
const db = require('../models/index');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const news = await db.News.findAll({
      include:  {model: db.User, as: "user"}
    });
    res.send(news);
  } catch (error) {
    console.log(error)
    res.send(error)
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { user_id, images, tags, title, content} = req.body;
    let news = await db.News.create({
      user_id,
      title,
      tags,
      content,
      images
    });
    res.send(news);
  } catch (error) {
    res.sendStatus(error.status || 500);
  }
})

module.exports = router;
