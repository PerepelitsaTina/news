const express = require('express');
const db = require('../models/index');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { createToken } = require('../utils/jwt')


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
  }
});



module.exports = router;