const { Comment, User } = require('../models')
const commentServices = {
  getCommentsByCourt: async (req, cb) => {
    const courtId = req.params.courtId
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit
    try {
      const comments = await Comment.findAll({
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
      return cb(null, comments)
    } catch (err) {
      cb(err)
    }
  }
}

module.exports = commentServices
