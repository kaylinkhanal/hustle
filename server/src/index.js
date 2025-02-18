const express = require('express')
const cors = require('cors')
const app = express()
const port = 8080
app.use(express.json())
app.use(cors())

app.use('/uploads',express.static('uploads'));
const userRoute = require('./routes/users')
const jobRoute = require('./routes/jobs')

const connect = require('./db/connection')
connect()
app.use(userRoute)
app.use(jobRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
