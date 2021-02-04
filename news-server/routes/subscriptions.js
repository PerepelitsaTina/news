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

module.exports = router;