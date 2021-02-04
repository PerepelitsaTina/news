const express = require("express");
const db = require("../models/index");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { user_id, news_id } = req.body;
    console.log(req.body);
    let like = await db.Like.create({
      user_id,
      news_id,
    });
    res.send(like);
  } catch (error) {
    res.send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const user_id = req.query.user;
    let likes = await db.Like.findAll({
      where: {
        user_id,
      },
      include: { 
        model: db.News, 
        as: "news",
        include: [{
          model: db.Like,
          as: "likes"
        }, {
          model: db.User,
          as: "user"
        }]
      },
      order: [['createdAt', 'DESC']]
    });
    res.send(likes)
  } catch (error) {
    console.log(error);
    res.send(error)
  }
});

router.delete("/", async (req, res) => {
  try {
    const user_id = req.query.user;
    const news_id = req.query.news;
    const result = await db.Like.destroy({
      where: {
        user_id,
        news_id,
      },
    });
    console.log(result);
    if (result === 0) {
      throw {
        status: 404,
        message: "Not found",
      };
    }
    res.send(result.toJSON());
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
