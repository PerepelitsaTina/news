const express = require("express");
const db = require("../models/index");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { follower_id, subscription_id } = req.body;
    console.log(req.body);
    let subscription = await db.Subscription.create({
      follower_id,
      subscription_id,
    });
    res.send(subscription);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.delete("/", async (req, res) => {
  try {
    const follower_id = req.query.follower;
    const subscription_id = req.query.subscription;
    const result = await db.Subscription.destroy({
      where: {
        follower_id,
        subscription_id
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
    res.send(error)
  }
});

module.exports = router;