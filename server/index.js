const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
const port = 8080
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/hustleDb');



const userSchema = new mongoose.Schema({
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


const jobSchema = new mongoose.Schema({
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


app.post('/register', async(req, res) => {
  // email should not exist
  const user = await User.exists({email: req.body.email})
  if(user) return res.send("Email is taken")
  // password  should hash
       req.body.password = await  bcrypt.hash(req.body.password, saltRounds)
  //save to db
    User.create(req.body)
    res.send("User created successfully")
  })




app.post('/login', async(req, res) => {
  // email should exist
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.send("Email does not exist")
  // compare password from db with body.password, objective is password should match
    const isMatched = await  bcrypt.compare(req.body.password,user.password )
    if(!isMatched) return res.send("Invalid Password!!")
    //generate a unique token based on email
    const token = jwt.sign({ email: req.body.email }, 'ff0bfa66c5a0889ee575b01f7b3a926471eabe901ab2076202a4f21f170f903fdc76dc8a5ddccb9e72ce2b50d6a092870040bfa3d3c6b4d0f0ab269bbbbb95afcc160062f9758249f20bedde4c66c5deccab05eefed161c8416c192e1ea778c28c3cc3d0926a55707ebd96c67fcf00de40e08a09bb5300f10c2e0a708d7110e');
    res.send({
      token,
      user
    })
})


app.post('/jobs', async(req, res) => {
  Job.create(req.body)
  res.send("Job created succesfully")
})


app.get('/jobs', async(req, res) => {
  const job = await Job.find().populate('recruiter')
  res.send(job)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})