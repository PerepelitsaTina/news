'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define('News', {
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    images: DataTypes.STRING,
    tags: DataTypes.STRING
  }, {});

  News.associate = function(models) {
    News.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'})
  };
  return News;
};


// class News extends Model {
//   /**
//    * Helper method for defining associations.
//    * This method is not a part of Sequelize lifecycle.
//    * The `models/index` file will call this method automatically.
//    */
//   static associate(models) {
//     News.belongsTo(models.User, {
//       foreignKey: 'user_id',
//       onDelete: 'CASCADE'
//     })
//   }
// };
