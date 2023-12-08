const passport = require('passport')
const passportJWT = require('passport-jwt')
const LocalStrategy = require('passport-local')
const { User, TennisCourt } = require('../models')
const bcrypt = require('bcryptjs')

const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

passport.use(new LocalStrategy(
  // customize user field
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  // authenticate user
  async (req, email, password, cb) => {
    try {
      const user = await User.findOne({ where: { email } })
      if (!user) {
        return cb(null, false, req.flash('error_messages', 'Email or password is wrong!'))
      }
      const res = await bcrypt.compare(password, user.password)
      if (!res) {
        return cb(null, false, req.flash('error_messages', 'Email or password is wrong!'))
      }
      return cb(null, user)
    } catch (err) {
      return cb(err)
    }
  }
))
const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}
passport.use(new JWTStrategy(jwtOptions, async (jwtPayload, cb) => {
  try {
    const user = await User.findByPk(jwtPayload.id, {
      include: [
        { model: TennisCourt, as: 'FavortiedCourts' }
      ]
    })
    return cb(null, user)
  } catch (err) {
    cb(err)
  }
}))
// serialize and deserialize user
passport.serializeUser((user, cb) => {
  cb(null, user.userId)
})
passport.deserializeUser(async (userId, cb) => {
  try {
    const user = await User.findByPk(userId, {
      include: [
        { model: TennisCourt, as: 'FavortiedCourts' }
      ]
    })
    return cb(null, user.toJSON())
  } catch (err) {
    cb(err)
  }
})
module.exports = passport
