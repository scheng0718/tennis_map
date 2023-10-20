'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class TennisCourt extends Model {
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
    houseNumber: DataTypes.STRING(50),
    street: DataTypes.STRING(255),
    city: DataTypes.STRING(100),
    county: DataTypes.STRING(100),
    state: DataTypes.STRING(100),
    stateCode: DataTypes.STRING(50),
    postalCode: DataTypes.STRING(50),
    countryCode: DataTypes.STRING(50),
    country: DataTypes.STRING(100),
    fullAddress: DataTypes.TEXT,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
    typeId: DataTypes.INTEGER,
    phone: DataTypes.STRING(100),
    location: DataTypes.GEOMETRY('POINT')
  }, {
    sequelize,
    modelName: 'TennisCourt',
    tableName: 'TennisCourts',
    underscored: true
  })
  return TennisCourt
}
