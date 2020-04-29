'use strict';
module.exports = (sequelize, DataTypes) => {
  const rating = sequelize.define('rating', {
    rating: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER
  }, {});
  rating.associate = function(models) {
    // associations can be defined here
    models.rating.belongsTo(models.user)
    models.rating.belongsTo(models.game)
  };
  return rating;
};