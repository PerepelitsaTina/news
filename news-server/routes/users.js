const express = require('express');
const db = require('../models/index');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { createToken } = require('../utils/jwt');
const upload = require('../utils//uploads')
const { response } = require('../app');
const passport = require('passport');
const auth = passport.authenticate('jwt', {session: false});



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

router.post('/googleAuth', async (req, res) => {
  try {
    const {
      email,
      firstName,
      lastName,
      photoUrl
    } = req.body;
    let user = await db.User.findOne({
      where: { 
        email 
      }
    });
    if (user) {
      const token = createToken(user.id);
      user = user.toJSON();
      delete user.password;
      res.json({
        user,
        token
      });
    } else {
      let newUser = await db.User.create({
        email,
        password: bcrypt.hashSync(firstName, saltRounds),
        login: firstName + lastName,
        avatar: photoUrl
      })
      const token = createToken(newUser.id);
      newUser = newUser.toJSON();
      delete newUser.password;
      res.json({
        user: newUser,
        token
      });
    }
  } catch (err) {
    response.status(err.status || 500).send('User was not created');
  }
}
)

router.get("/:id", auth, async (req, res, next) => {
  try {
    const currentUser = req.user;
    const options = {
      include: [{
        model: db.News, 
        as: "news", 
        include: { 
          model: db.Like, 
          as: "likes", 
        }
      }, {
        model: db.Like,
        as: "likes",
        include: {
          model: db.News,
          as: "news",
          include: { 
            model: db.Like, 
            as: "likes", 
          }
        }
      }],
      order: [[{ model: db.News, as: "news" }, 'createdAt', 'DESC']]
    }
    let user = await db.User.findByPk(req.params.id, options);

    if (!user) {
      return res.status(404).send("User is not found");
    }
    user = user.toJSON();
    delete user.password;
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(error.status || 500);
  }
})

router.patch("/:id", upload.single('image'), async (req, res, next) => {
  try {
    const updatedUser = {};
    if (req.body.login) {
      const { login } = JSON.parse(req.body.login);
      updatedUser.login = login;
    }
    if (req.file) {
      updatedUser.avatar = req.file.path;
    }

    let [isUpdated, [user]] = await db.User.update(updatedUser, {
      where: {
        id: req.params.id
      },
      returning: true
    });

    user = user.toJSON();
    delete user.password;
    res.json(user);
  } catch (error) {
    res.sendStatus(error.status || 500);
  }
})

module.exports = router;