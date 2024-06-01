const express = require ('express')
const router = express.Router()

// import route methods from profile controller

const {getProfile, changePassword, changeUsername, changeEmail }= require('../controller/profile')


//set up profile route
router.route('/getprofile').get(getProfile)
router.route('/changepassword').post(changePassword)
router.route('/changeusername').post(changeUsername)
router.route('/changeemail').patch(changeEmail)

module.exports = router