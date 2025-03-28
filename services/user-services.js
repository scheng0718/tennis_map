const { User } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const redisClient = require('../config/redisConfig')
const userServices = {
  signUp: async (req, cb) => {
    const { name, email, password, passwordCheck } = req.body
    try {
      if (!name) return cb(new Error('Name is required!'))
      if (!email) return cb(new Error('Email is required!'))
      if (password !== passwordCheck) return cb(new Error('Passwords do not match'))

      const user = await User.findOne({ where: { email: email.toLowerCase() } })
      if (user) {
        throw new Error('Email already exists')
      }
      const hash = await bcrypt.hash(req.body.password, 10)
      const newUser = await User.create({
        name: name,
        email: email.toLowerCase(),
        password: hash
      })
      return cb(null, { user: newUser })
    } catch (err) {
      cb(err)
    }
  },
  signIn: async (req, cb) => {
    try {
      if (!req.user) return cb(new Error('Invalid credentials'))

      const userData = req.user.toJSON()
      delete userData.password
      const payload = {
        ...userData,
        jti: uuid.v4()
      }
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
      return cb(null, {
        token,
        user: payload
      })
    } catch (err) {
      cb(err)
    }
  },
  signOut: async (req, cb) => {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) return cb(new Error('No Token Provided!'))

    const decodedToken = jwt.decode(token)
    const jti = decodedToken.jti
    if (!jti) return cb(new Error('Invalid Token'))

    req.logout(err => {
      if (err) {
        return cb(err)
      } else {
        redisClient.set(`blacklist_${jti}`, 'blacklisted', 'EX', 4000)
        return cb(null, { message: 'Successfully signed out!' })
      }
    })
  }
}

module.exports = userServices
