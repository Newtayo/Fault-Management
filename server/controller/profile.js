const Profile = require('../models/profile')
const User = require('../models/user')
const {StatusCodes} = require('http-status-codes')
const customErrors = require('../errors/customError')

//method to get profile
const getProfile = async(req, res)=>{
    const {name } = req.user
    if(!name){
        throw new customErrors('User does not esist', StatusCodes.BAD_REQUEST)
    }
    
    const getUserProfile = await Profile.findOne({email: name})

    if(!getUserProfile){
        throw new customErrors('User does not have a profile', StatusCodes.BAD_REQUEST)
    }

    res.status(200).json({ profile: getUserProfile})
}

//method to change password
const changePassword = async (req,res)=>{
    const {name} = req.user
    const {password} = req.body
    const user = await User.findOne({email: name})
    if(!user){
        throw new customErrors('Password Update Failed', StatusCodes.BAD_REQUEST)
    }
    user.password = password
    await user.save()
    res.status(StatusCodes.OK).json({msg: "Password Change Successful"})
}
//method to change Username
const changeUsername = async(req,res)=>{
    const {name} = req.user
    const {username} = req.body
    
    const userProfile = await Profile.findOne({email: name})
    if(!userProfile){
        throw new customErrors('User does not exist', StatusCodes.BAD_REQUEST)
    }
    userProfile.username = username

    await userProfile.save()

    res.status(StatusCodes.OK).json({msg: "Username Successful changed"})
}
//method to change email
const changeEmail = async(req,res)=>{
    const {name} = req.user
    const {email} = req.body
    
    const userProfile = await Profile.findOne({email: name})
    await User.findOneAndUpdate({email: name}, {email: email},{new:true, runValidators:true})
    if(!userProfile){
        throw new customErrors('User does not exist', StatusCodes.BAD_REQUEST)
    }
    userProfile.email = email
 

    await userProfile.save()


    res.status(StatusCodes.OK).json({msg: "Email Successful changed"})
}
module.exports = {getProfile,
changePassword,
changeUsername,
changeEmail,
}