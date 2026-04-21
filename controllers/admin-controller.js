const adminServices = require('../services/admin-services')

const ok = (res, data) => res.json({ status: 'success', data })
const created = (res, data) => res.status(201).json({ status: 'success', data })

const adminController = {
  getCourts: (req, res, next) => adminServices.getCourts(req, (err, data) => err ? next(err) : ok(res, data)),
  createCourt: (req, res, next) => adminServices.createCourt(req, (err, data) => err ? next(err) : created(res, data)),
  updateCourt: (req, res, next) => adminServices.updateCourt(req, (err, data) => err ? next(err) : ok(res, data)),
  deleteCourt: (req, res, next) => adminServices.deleteCourt(req, (err, data) => err ? next(err) : ok(res, data)),
  getUsers: (req, res, next) => adminServices.getUsers(req, (err, data) => err ? next(err) : ok(res, data)),
  deleteUser: (req, res, next) => adminServices.deleteUser(req, (err, data) => err ? next(err) : ok(res, data)),
  getComments: (req, res, next) => adminServices.getComments(req, (err, data) => err ? next(err) : ok(res, data)),
  deleteComment: (req, res, next) => adminServices.deleteComment(req, (err, data) => err ? next(err) : ok(res, data))
}

module.exports = adminController
