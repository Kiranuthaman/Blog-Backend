// import express
const express = require('express')

//  instance router
const router = new express.Router()

// user controller
const userController = require('./controller/userController')








// register
router.post('/register',userController.register)

// LOGIN
router.post('/login',userController.login)


module.exports = router