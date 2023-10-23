if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const router = require('./routes')
const PORT = 3000

app.use(express.static('public'))
app.use(express.json())
app.use('/api', router)
app.get('/', (req, res) => {
  res.send('Hello Tennis Fans!')
})
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})

module.exports = app
