const express = require('express');
const db = require('../models/index');
const upload = require('../utils//uploads')
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const news = await db.News.findAll({
      order: [['createdAt', 'DESC']],
      include:  {model: db.User, as: "user"}
    });
    res.send(news);
  } catch (error) {
    res.send(error)
  }
});

router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const { user_id, tags, title, content} = JSON.parse(req.body.news);
    let news = await db.News.create({
      user_id,
      title,
      tags,
      content,
      images: req.file ? req.file.path : ""
    });
    res.send(news);
  } catch (error) {
    res.sendStatus(error.status || 500);
  }
})

module.exports = router;
