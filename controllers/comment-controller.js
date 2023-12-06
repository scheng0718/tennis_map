const commentServices = require('../services/comment-services')
const commentController = {
  getCommentsByCourt: (req, res, next) => {
    commentServices.getCommentsByCourt(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }
}
module.exports = commentController
