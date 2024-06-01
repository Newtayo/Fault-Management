const mongoose = require('mongoose')

//connecting to database
const connectDB = (url) => mongoose.connect(url)

module.exports = connectDB