'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class TennisCourt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      TennisCourt.belongsTo(models.Type, { foreignKey: 'typeId' })
      TennisCourt.hasMany(models.Comment, { foreignKey: 'courtId' })
      TennisCourt.belongsToMany(models.User, {
        through: models.Favorite,
        foreignKey: 'courtId',
        as: 'FavoritedUsers'
      })
    }
  }
  TennisCourt.init({
    courtId: DataTypes.BIGINT,
    courtName: DataTypes.STRING(100),
    street1: DataTypes.STRING(255),
    street2: DataTypes.STRING(255),
    city: DataTypes.STRING(100),
    stateOrProvince: DataTypes.STRING(100),
    country: DataTypes.STRING(100),
    zipCode: DataTypes.STRING(50),
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
    typeId: DataTypes.SMALLINT,
    phone: DataTypes.STRING(100),
    email: DataTypes.STRING(255),
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'TennisCourt',
    tableName: 'TennisCourts',
    underscored: true
  })
  return TennisCourt
}
