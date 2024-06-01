const express = require ('express')
const router = express.Router()

// import route methods from auth controller
const {register, login, verifyEmail, logout, verificationEmail, sendResetPasswordEmail, resetPassword, sendOTP,verifyOTP} = require('../controller/auth')

//set up auth route
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/verify-email').patch(verifyEmail)
router.route('/logout').post(logout)
router.route('/verification-email').post(verificationEmail )
router.route('/reset-email').patch(sendResetPasswordEmail)
router.route('/resetpassword').post(resetPassword)
router.route('/sendotp').post(sendOTP)
router.route('/verifyotp').post(verifyOTP)

//sexport route
module.exports = router