'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Type.hasMany(models.TennisCourt, { foreignKey: 'typeId' })
    }
  }
  Type.init({
    typeId: DataTypes.INTEGER,
    type: DataTypes.STRING(50)
  }, {
    sequelize,
    modelName: 'Type',
    tableName: 'Types',
    underscored: true
  })
  return Type
}
