'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {})
  // User.associate = function(models) {
  //   User.hasMany(models.News, {
  //     foreignKey: 'user_id',
  //     as: 'news',
  //   });
  // };
  return User;
};


// User.init({
  //   email: DataTypes.STRING,
  //   login: DataTypes.STRING,
  //   password: DataTypes.STRING,
  //   avatar: DataTypes.STRING
  // }, {
  //   sequelize,
  //   modelName: 'User',
  // });
  // return User;
