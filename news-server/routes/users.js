const express = require('express');
const db = require('../models/index');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { createToken } = require('../utils/jwt');
const { response } = require('../app');


router.post("/register", async (req, res, next) => {
  try {
    const { email, login, password, avatar } = req.body;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    let user = await db.User.create({
      email,
      login,
      password: hashedPassword,
      avatar
    });
    const token = createToken(user.id);
    user = user.toJSON();
    delete user.password;
    res.json({
      user,
      token
    });
  } catch (error) {
    console.log(error);
    response.status(err.status || 500).send('User was not created');
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await db.User.findOne({
      where: {
        email
      }
    });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = createToken(user.id);
      user = user.toJSON();
      delete user.password;
      res.json({
        user,
        token
      });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(error.status || 500);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    let user  = await db.User.findByPk(req.params.id, {
      include: {model: db.News, as: "news"}
    });
    if (!user) {
      return res.status(404).send("User is not found");
    }
    user = user.toJSON();
    delete user.password;
    res.send(user);
  } catch (error) {
    res.sendStatus(error.status || 500);
  }
})

module.exports = router;