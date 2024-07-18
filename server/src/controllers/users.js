const User = require('../models/users')
const registerNewUser = (req, res) => {
    try{
        User.create(req.body)
        res.send("ok created")
    }catch(err){
        res.send("sth went wrong")
    }
  
}

const loginUser = (req, res) => {
    res.send("ok");
}


module.exports ={registerNewUser,loginUser}