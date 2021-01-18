const passportJWT = require('passport-jwt');
const db = require('../models');
const jwt = require("jsonwebtoken");
const SECRET_KEY = 'DUNICE';


const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const JWTOptions = {};
JWTOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
JWTOptions.secretOrKey = SECRET_KEY;

const strategy = new JWTStrategy(JWTOptions, async function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    const user = db.User.findOne({
        where: {
            id: jwt_payload.id
        }
    });
    if(user) {
        next(null, user)
    } else {
        next(null, false)
    }
});

const createToken = (userId) => {
  return jwt.sign(
    {
      id: userId
    },
    SECRET_KEY,
    {
      expiresIn: "20m"
    }
    );
};

module.exports = { strategy, createToken }
