const express = require('express')
const app = express()
const { router, apis } = require('./routes')
const PORT = 3000

app.use('/', router)
app.use('/api', apis)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
