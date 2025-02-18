const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/hustleDb');
const { Schema } = mongoose;
const jobSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    salary: { type: Number },
    location: { type: String },
    jobType: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship', 'Freelance'] },
    experienceLevel: { type: String, enum: ['Entry-level', 'Mid-level', 'Senior-level', 'Executive'] },
    industry: { type: String },
    skills: [{ type: String }],
    responsibilities: [{ type: String }],
    qualifications: [{ type: String }],
    recruiter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    applicationDeadline: { type: Date },
    openings: { type: Number, default: 1 },
    status: { type: String, enum: ['Open', 'Closed', 'On Hold'], default: 'Open' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  const Job = mongoose.model('Job', jobSchema);
  module.exports = Job