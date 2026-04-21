const favoriteServices = require('../services/favorite-services')

const favoriteController = {
  addFavorite: (req, res, next) => {
    favoriteServices.addFavorite(req, (err, data) => err ? next(err) : res.status(201).json({ status: 'success', data }))
  },
  removeFavorite: (req, res, next) => {
    favoriteServices.removeFavorite(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  getFavorites: (req, res, next) => {
    favoriteServices.getFavorites(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }
}

module.exports = favoriteController
