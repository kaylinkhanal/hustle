const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/hustleDb');
const { Schema } = mongoose;
const JobApplicationSchema = new Schema({
    jobId: { type: mongoose.Schema.ObjectId, ref: "Job", required: true },
    userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    appliedDate: { type: Date, default: Date.now }
});

const JobApplication = mongoose.model("JobApplication", JobApplicationSchema);

module.exports = JobApplication;
