const User = require('../models/user')
const mongoose = require('mongoose')
const {StatusCodes} = require('http-status-codes')
const customErrors = require('../errors/customError')
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail')
const { devNull } = require('os')
const Profile = require('../models/profile')
const sendToken = require('../utils/sendToken')
const { NONAME } = require('dns')

//method for user registration
const register = async (req, res)=>{
    const {email, phoneNumber, password, username, interest} = req.body
    const verificationToken = crypto.randomBytes(40).toString('hex');
   const newUser = await User.create({
    email,
    phoneNumber,
    password,
    verificationToken
    })
    //also create user profile
    await Profile.create({
        email,
        phoneNumber,
        username,
        interest
    })
    const message = "Email Confirmation"
    const link = `<h1>Hello ${newUser.email}</h1>
        <p>Kindly click on this <a href=${process.env.BASE_URL}verify-email?verifactionToken=${verificationToken}&email=${newUser.email}&phone=${newUser.phoneNumber}>link</a> to verify your email </p>`
    await sendEmail ({to: newUser.email, subject:message, html:link})
   
   res.status(StatusCodes.CREATED).json({ user: {email: newUser.email}, verificationToken });
}

//method to verify user email
const verifyEmail = async (req, res)=>{
    const {verificationToken, email} = req.body
    const user = await User.findOne({email})

    if(!user){
        throw new customErrors('User not found', StatusCodes.BAD_REQUEST)
    }
    if(user.verificationToken !== verificationToken){
        console.log(user.verificationToken)
        console.log(verificationToken)
        throw new customErrors('Verification Code is not valid', StatusCodes.UNAUTHORIZED) 
    }
  await User.findOneAndUpdate({email}, {isVerified: true, verificationToken:''},{new:true, runValidators:true})

    res.status(StatusCodes.OK).json({ msg: "Email verified" });
}
//method to authenticate user
const login = async (req, res) =>{
    const {email, password, phoneNumber} = req.body

    if(!password){

    throw new customErrors('Please fill in the username and password', StatusCodes.BAD_REQUEST)

    }
    const user = await User.findOne({
        $or: [
          { email: { $regex: new RegExp(email, 'i') } },
          { phoneNumber: { $regex: new RegExp(phoneNumber, 'i') } }
        ]
      });
      

    if(!user){
     throw new customErrors('Please Provide a Valid Credential', StatusCodes.UNAUTHORIZED)
    }
   
    const isPasswordSame = await user.comparePassword(password)
    if(!isPasswordSame){
     throw new customErrors('Incorrect password', StatusCodes.UNAUTHORIZED)
    }
   
    const token = user.createJWTOken()
    const expireday = 1000 * 60 *60 * 24
    const secureCookie = process.env.NODE_ENV === 'production'; 
    res.cookie('access token', token, {
    httpOnly:true,
    expires: new Date(Date.now() +  expireday),
    secure: secureCookie,
    sameSite: 'none',

    });
    res.status(StatusCodes.OK).json({ user: {email: user.email} });
}
//method to logout
const logout = async (req, res)=>{
    res.cookie('access token', "token", {
        httpOnly:true,
        expires: new Date(Date.now() ),
        });
    res.status(StatusCodes.OK).json({msg:"User succesfully logout"})
}
//method to send verification email during registration
const verificationEmail = async(req, res) =>{
    const { to, subject, html} = req.body

    await sendEmail ({to, subject, html})

    res.status(200).json({msg:"Email successfully sent"})
}

//method to send email for resetting password
const sendResetPasswordEmail =async(req, res)=>{
    const {email} = req.body
    const resetToken = crypto.randomBytes(40).toString('hex');

    if(!email){
        throw new customErrors('Please provide a valid email', StatusCodes.BAD_REQUEST)
    }
    const user = await User.findOneAndUpdate({email}, {resetToken: resetToken},{new:true, runValidators:true})
    if(user){

        const mailSubject = "Password Reset"
        const link = `<h4>Hello ${user.email}</h4>
        <p>Kindly click on this <a href=${process.env.BASE_URL}/reset-password?resetToken=${resetToken}&email=${user.email}>link</a> to verify your email </p>`

        await sendEmail({ to:user.email, subject: mailSubject, html: link})
        
    }
    res.status(StatusCodes.OK).json({message: "Password reset link has been sent to your Email"})

}
//handles password reset functionality
const resetPassword = async(req, res)=>{
    const {email, resetToken, password} = req.body

    const user = await User.findOne({email})
   if(user){
    console.log(user)
    console.log(user.resetToken)
    if(user.resetToken !== resetToken){
        throw new customErrors('Expired Link, Please reset password to get another link', StatusCodes.BAD_REQUEST)
        }
        user.password = password
        user.resetToken = null
        await user.save();
   }

    res.status(StatusCodes.OK).json({message:"Password Reset Successful"})
}
//handles sending of OTP codes
const sendOTP = async(req,res)=>{
    const {phone} = req.body

    await sendToken({phone})

    res.status(StatusCodes.OK).json({msg:"OTP code sent"})
}

//Methods that handles OTP verification
const verifyOTP = async(req,res)=>{
    const {otp} = req.body

    if(otp !== '4563'){
        throw new customErrors('Incorrect OTP', StatusCodes.BAD_REQUEST) 
    }
    else{
        res.status(StatusCodes.OK).json({msg:"Phone Number has been verified"})
    }
}
module.exports = {
    register,
    login,
    verifyEmail,
    logout,
    verificationEmail,
    sendResetPasswordEmail,
    resetPassword,
    sendOTP,
    verifyOTP,
}