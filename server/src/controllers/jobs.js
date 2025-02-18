const Job = require('../models/jobs');

const createJob = async (req, res) => {
    Job.create(req.body);
    res.send("Job created successfully");
};

const getJob = async (req, res) => {
    const job = await Job.find().populate('recruiter');
    res.send(job);

};
module.exports ={createJob,getJob}