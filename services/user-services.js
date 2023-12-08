const { User } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userServices = {
  signUp: async (req, cb) => {
    const { name, email, password, passwordCheck } = req.body
    try {
      if (!name) {
        throw new Error('Name is required!')
      }
      if (!email) {
        throw new Error('Email is required!')
      }
      if (password !== passwordCheck) {
        throw new Error('Passwords do not match')
      }
      const user = await User.findOne({ where: { email: email } })
      if (user) {
        throw new Error('Email already exists')
      }
      const hash = await bcrypt.hash(req.body.password, 10)
      const newUser = await User.create({
        name: name,
        email: email,
        password: hash
      })
      return cb(null, { user: newUser })
    } catch (err) {
      cb(err)
    }
  },
  signIn: async (req, cb) => {
    try {
      const userData = req.user.toJSON()
      delete userData.password
      const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' })
      return cb(null, {
        token,
        user: userData
      })
    } catch (err) {
      cb(err)
    }
  }
}

module.exports = userServices
