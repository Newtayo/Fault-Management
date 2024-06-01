require("dotenv").config()
require("express-async-errors");

const express = require('express')
const app = express ()
const connectDB = require('./db/connectDB')
const cookieParser = require('cookie-parser')
const auth = require('./routes/auth')
const profile = require('./routes/profile')
const cors = require('cors')
const authentication = require('./middlewares/authentication')
const notfound = require('./middlewares/notfound')
const errorMiddlewares = require('./errors/errorMiddleWare')

const port = process.env.PORT || 3000
//add json cors and cookie parser middleware to express app
app.use(express.json())
app.use(cors(  {origin: 'https://brillscomer.onrender.com', 
credentials: true}))
app.use(cookieParser())

//set up route in the app.js
app.use('/api/v1', auth);

//ensures that only authenticated users have access to getprofile information
app.use('/api/v1', authentication, profile);

//implement errorhandling middleware as well as page not found
app.use(errorMiddlewares);
app.use(notfound);

//server configuration
const start = async()=> {
    try {
    
        await connectDB(process.env.MONGO_URL)
        app.listen(port,()=>{
            
        })
        
    } catch (error) {
        console.log(error);
    }
}
//start up server
start()