const commentServices = require('../services/comment-services')
const commentController = {
  getCommentsByCourt: (req, res, next) => {
    commentServices.getCommentsByCourt(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  createComment: (req, res, next) => {
    commentServices.createComment(req, (err, data) => err ? next(err) : res.status(201).json({ status: 'success', data }))
  },
  updateComment: (req, res, next) => {
    commentServices.updateComment(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  deleteComment: (req, res, next) => {
    commentServices.deleteComment(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }
}
module.exports = commentController
