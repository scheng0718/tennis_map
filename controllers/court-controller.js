const courtServices = require('../services/court-services')
const courtController = {
  getCourts: (req, res, next) => {
    courtServices.getCourts(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }
}
module.exports = courtController
