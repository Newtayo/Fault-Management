const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

//create user schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
          unique: true,
    },
    phoneNumber: {
        type: String,
        required:[true,'Please enter your phone number' ],
        minlength: 10,
        maxlength:20,
    },
    password: {
        type: String,
        required:[true,'Please provide a valid password' ],
        minlength:6,
    },
    verificationToken: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetToken: String,
})
//hashing password everytime a user is saved
UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
//method for creating JWT token
UserSchema.methods.createJWTOken = function (){
    return jwt.sign({userId:this._id, email:this.email}, 
         process.env.JWT_SECRET,{expiresIn: process.env.JWT_LIFETIME})
}
//method of comparing password between the input password and password in database
UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}
module.exports =mongoose.model('User', UserSchema)