'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      User.hasMany(models.Comment, { foreignKey: 'userId' })
      User.belongsToMany(models.TennisCourt, {
        through: models.Favorite,
        foreignKey: 'userId',
        as: 'FavoritedCourts'
      })
    }
  }
  User.init({
    userId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING(100),
    username: DataTypes.STRING(100),
    email: DataTypes.STRING(255),
    password: DataTypes.STRING(100),
    role: DataTypes.STRING(50),
    avatar: DataTypes.STRING(255),
    introduction: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: true
  })
  return User
}
