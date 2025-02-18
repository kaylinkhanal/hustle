const { Router } = require('express');
const { createJob, getJob } = require('../controllers/jobs');
const app = Router();

app.post('/jobs', createJob);
app.get('/jobs', getJob);
module.exports = app;