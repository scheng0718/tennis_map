const courtServices = require('../services/court-services')
const courtController = {
  getCourts: (req, res, next) => {
    courtServices.getCourts(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  getCourt: (req, res, next) => {
    courtServices.getCourt(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  getCourtsByMap: (req, res, next) => {
    courtServices.getCourtsByMap(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  getNearByCourts: (req, res, next) => {
    courtServices.getNearByCourts(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  getCourtsBySearch: (req, res, next) => {
    courtServices.getCourtsBySearch(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }
}
module.exports = courtController
