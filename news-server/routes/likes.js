const express = require("express");
const db = require("../models/index");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { user_id, news_id } = req.body;
    let like = await db.Like.create({
      user_id,
      news_id,
    });
    res.send(like);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;