const mongoose = require('mongoose')

//create profile schema
const ProfileSchema = new mongoose.Schema ({
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
        maxlength:50,
    },

    interest:{
        type: String,
        required:[true,'Please State your sport interest' ],
        minlength: 2,
        maxlength:50,
    },
    username:{
        type: String,
        required:[true,'Please State your sport interest' ],
        minlength: 2,
        maxlength:50,
    }

})

module.exports = mongoose.model('Profile', ProfileSchema )