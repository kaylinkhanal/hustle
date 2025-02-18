const User = require('../models/users')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


const registerNewUser = async (req, res) => {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) return res.send("Email already taken");

    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    User.create(req.body);
    res.send("Registered Successfully");

}
const loginUser = async (req, res) => {
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
}


module.exports ={registerNewUser,loginUser}