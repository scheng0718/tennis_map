'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Favorite.init({
    favoriteId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    userId: DataTypes.BIGINT,
    courtId: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Favorite',
    tableName: 'Favorites',
    underscored: true
  })
  return Favorite
}
