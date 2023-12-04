const { TennisCourt } = require('../models')
const courtServices = {
  getCourts: (req, cb) => {
    return TennisCourt.findAll({ raw: true })
      .then(tennisCourts => {
        return cb(null, {
          tennisCourts
        })
      })
      .catch(err => cb(err))
  }
}

module.exports = courtServices
