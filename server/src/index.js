const express = require('express')
const app = express()
app.use(express.json())
const port = 8000
const userRoute = require('./routes/users')
const connect = require('./db/connection')
app.use(userRoute)
connect()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})