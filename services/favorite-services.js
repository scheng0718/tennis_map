const { Favorite, TennisCourt, Type } = require('../models')

const favoriteServices = {
  addFavorite: async (req, cb) => {
    const courtId = req.params.courtId
    const userId = req.user.userId
    try {
      const court = await TennisCourt.findByPk(courtId)
      if (!court) return cb(Object.assign(new Error('Court not found'), { status: 404 }))

      const existing = await Favorite.findOne({ where: { userId, courtId } })
      if (existing) return cb(Object.assign(new Error('Already favorited'), { status: 400 }))

      const favorite = await Favorite.create({ userId, courtId })
      return cb(null, { favorite })
    } catch (err) {
      cb(err)
    }
  },
  removeFavorite: async (req, cb) => {
    const courtId = req.params.courtId
    const userId = req.user.userId
    try {
      const favorite = await Favorite.findOne({ where: { userId, courtId } })
      if (!favorite) return cb(Object.assign(new Error('Favorite not found'), { status: 404 }))

      await favorite.destroy()
      return cb(null, { message: 'Unfavorited' })
    } catch (err) {
      cb(err)
    }
  },
  getFavorites: async (req, cb) => {
    const userId = req.user.userId
    try {
      const favorites = await Favorite.findAll({
        where: { userId },
        include: [{ model: TennisCourt, include: [Type] }]
      })
      return cb(null, { favorites })
    } catch (err) {
      cb(err)
    }
  }
}

module.exports = favoriteServices
