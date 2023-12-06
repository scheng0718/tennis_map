const { Comment, TennisCourt, Type, User } = require('../models')
const courtServices = {
  getCourts: (req, cb) => {
    return TennisCourt.findAll({ raw: true })
      .then(tennisCourts => {
        return cb(null, {
          tennisCourts
        })
      })
      .catch(err => cb(err))
  },
  getCourt: (req, cb) => {
    const id = req.params.courtId
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit
    return TennisCourt.findByPk(id, {
      include: [
        Type,
        {
          model: Comment,
          include: User,
          limit: limit,
          offset: offset
        },
        {
          model: User,
          as: 'FavoritedUsers',
          attributes: { exclude: ['password'] }
        }
      ]
    })
      .then(tennisCourt => {
        return cb(null, { tennisCourt })
      })
      .catch(err => cb(err))
  }
}

module.exports = courtServices
