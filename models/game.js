'use strict';
module.exports = (sequelize, DataTypes) => {
  const game = sequelize.define('game', {
    name: DataTypes.STRING,
    summary: DataTypes.TEXT,
    release: DataTypes.STRING,
    cover: DataTypes.STRING
  }, {});
  game.associate = function(models) {
    // associations can be defined here
    models.game.hasMany(models.rating)
  };
  return game;
};