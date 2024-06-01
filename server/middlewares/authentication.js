const jwt = require('jsonwebtoken')
const customError = require('../errors/customError')
const { StatusCodes } = require("http-status-codes");

//To ensure that only authorized user have access to the profile page
const auth = async(req, res, next)=>{
    const signature = 'access token'
    const token = req.cookies[signature]

    if (!token){
        throw new customError ("No token provided", StatusCodes.UNAUTHORIZED)
    }


    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET)
         req.user = {userId: payload.userId, name:payload.email}
         next()

    } catch (error) {
       throw new customError('Invalid user token', StatusCodes.UNAUTHORIZED) 
    }

}

module.exports = auth