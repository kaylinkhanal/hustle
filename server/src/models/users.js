const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/hustleDb');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  fullName: { type: String, required: true },
  role: { type: String, enum: ['freelancer', 'client', 'company'], required: true },
  profile: {
    title: { type: String},
    skills: { type: [String], default: [] },
    hourlyRate: { type: Number, min: 0 },
    bio: { type: String },
    portfolioLinks: { type: [String], default: [] }
  },
  experience: [
    {
      position: { type: String },
      company: { type: String },
      duration: { type: String },
      description: { type: String }
    }
  ],
  education: {
    degree: { type: String },
    university: { type: String },
    graduationYear: { type: Number }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);
module.exports = User