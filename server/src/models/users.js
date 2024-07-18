const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: String, 
  phoneNumber: String, 
  gender: {
      type: String,
      enum : ['Male','Female','Others'],
      default: 'Male'
  },
  role: {
    type: String,
    enum : ['Recruiter','Freelancer'],
    default: 'Male'
  },
  email: String,
  password: String, 
});


const User = mongoose.model('User', userSchema);
module.exports = User