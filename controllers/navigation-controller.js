const naviationServices = require('../services/navigation-services')
const navigationController = {
  getDirection: (req, res, next) => {
    naviationServices.getDirection(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }
}

module.exports = navigationController
