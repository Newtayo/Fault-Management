const twilio = require('twilio')

//method for sending token to mobile phone
const sendToken =async({phone})=>{
    const client = new twilio (process.env.TWILO_SID, process.env.TWILO_APIKEY)

    return client.messages.create({body:'Your Otp code is 4563',from:'+15169798633',to:phone })
}

module.exports = sendToken