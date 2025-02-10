// import .env
require('dotenv').config()

//  import connection
require('./connection')

// import express 
const express = require('express')

// import 
const cors = require('cors')

// import router
const router = require('./router')

// server create
const pfserver = express()

// server using cors 
pfserver.use(cors())

// parse the data -> middleware to parse the data
pfserver.use(express.json())

// exporting upload folder
pfserver.use('/upload',express.static('./upload'))

// use
pfserver.use(router)


const PORT = 4000 || process.env.PORT

// listen 
pfserver.listen(PORT , ()=>{
    console.log(`PF server is runnung successfully in port ${PORT}`);
    
})


