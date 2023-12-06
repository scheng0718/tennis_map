const { Comment, User } = require('../models')
const commentServices = {
  getCommentsByCourt: (req, cb) => {
    const courtId = req.params.courtId
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit

    Comment.findAll({
      where: { courtId: courtId },
      limit: limit,
      offset: offset,
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] }
        }
      ]
    })
      .then(comments => cb(null, comments))
      .catch(err => cb(err))
  }
}

module.exports = commentServices
