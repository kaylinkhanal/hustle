const User = require('../models/users')
const registerNewUser = (req, res) => {
    User.create(req.body)
    res.send("ok created")
}

const loginUser = (req, res) => {
    res.send("ok");
}


module.exports ={registerNewUser,loginUser}