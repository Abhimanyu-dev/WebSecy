const jwt = require("jsonwebtoken")
require("dotenv").config()

const secret = process.env.TOKEN_SECRET

function generateToken(user_id){
    const token = jwt.sign({user_id: user_id, expiresIn: "1d"}, secret)
    return token
}


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, secret, (err, token) => {
    if(err)
      console.log(err)

    if (err) return res.sendStatus(403)

    req.user_id = token["user_id"]

    next()
  })
}

module.exports = {
    generateToken,
    authenticateToken
}