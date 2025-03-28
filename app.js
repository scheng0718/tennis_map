if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const cors = require('cors')
const app = express()
const router = require('./routes')
const PORT = 3000
const SESSION_SECRET = 'secret'

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use('/api', router)
app.get('/', (req, res) => {
  res.send('Hello Tennis Fans!')
})
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})

module.exports = app
