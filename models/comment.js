'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Comment.belongsTo(models.TennisCourt, { foreignKey: 'courtId' })
      Comment.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Comment.init({
    rating: DataTypes.SMALLINT,
    comment: DataTypes.TEXT,
    userId: DataTypes.BIGINT,
    courtId: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'Comments',
    underscored: true
  })
  return Comment
}
