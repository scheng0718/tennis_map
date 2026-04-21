const { Comment, User } = require('../models')
const commentServices = {
  getCommentsByCourt: async (req, cb) => {
    const courtId = req.params.courtId
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit
    try {
      const comments = await Comment.findAll({
        where: { courtId },
        limit,
        offset,
        include: [{ model: User, attributes: { exclude: ['password'] } }]
      })
      return cb(null, comments)
    } catch (err) {
      cb(err)
    }
  },
  createComment: async (req, cb) => {
    const courtId = req.params.courtId
    const userId = req.user.userId
    const { comment } = req.body
    try {
      if (!comment || !comment.trim()) {
        return cb(Object.assign(new Error('Comment is required'), { status: 400 }))
      }
      const newComment = await Comment.create({ comment: comment.trim(), userId, courtId })
      const result = await Comment.findByPk(newComment.commentId, {
        include: [{ model: User, attributes: { exclude: ['password'] } }]
      })
      return cb(null, { comment: result })
    } catch (err) {
      cb(err)
    }
  },
  updateComment: async (req, cb) => {
    const commentId = req.params.commentId
    const userId = req.user.userId
    const { comment } = req.body
    try {
      if (!comment || !comment.trim()) {
        return cb(Object.assign(new Error('Comment is required'), { status: 400 }))
      }
      const existing = await Comment.findByPk(commentId)
      if (!existing) return cb(Object.assign(new Error('Comment not found'), { status: 404 }))
      if (Number(existing.userId) !== Number(userId)) {
        return cb(Object.assign(new Error('Unauthorized'), { status: 403 }))
      }
      await existing.update({ comment: comment.trim() })
      return cb(null, { comment: existing })
    } catch (err) {
      cb(err)
    }
  },
  deleteComment: async (req, cb) => {
    const commentId = req.params.commentId
    const userId = req.user.userId
    try {
      const comment = await Comment.findByPk(commentId)
      if (!comment) return cb(Object.assign(new Error('Comment not found'), { status: 404 }))
      if (Number(comment.userId) !== Number(userId)) {
        return cb(Object.assign(new Error('Unauthorized'), { status: 403 }))
      }
      await comment.destroy()
      return cb(null, { message: 'Comment deleted' })
    } catch (err) {
      cb(err)
    }
  }
}

module.exports = commentServices
