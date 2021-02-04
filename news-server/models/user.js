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
  User.associate = function(models) {
    User.hasMany(models.News, { foreignKey: 'user_id', as: 'news' });
    User.hasMany(models.Like, { foreignKey: 'user_id', as: 'likes' });
    User.belongsToMany(User, { as: 'subscriptions', through: 'Subscriptions', foreignKey: 'follower_id', otherKey: 'subscription_id'});
    User.belongsToMany(User, { as: 'subscribers', through: 'Subscriptions', foreignKey: 'subscription_id', otherKey: 'follower_id'});
  };
  return User;
};
