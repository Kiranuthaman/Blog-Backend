// import express
const express = require('express')

//  instance router
const router = new express.Router()

// user controller
const userController = require('./controller/userController')

const postController = require('./controller/postController')

// jwtmiddleware
const jwtmiddleware = require('./middleware/jwtMiddleWare')

// multer

const multerconfig = require('./middleware/multerMIddleWare')


// register
router.post('/register',userController.register)

// LOGIN
router.post('/login',userController.login)

// add post 

router.post('/add-post' , jwtmiddleware,multerconfig.single("postImg"),postController.addPostController)

// get all post
router.get('/all-post',jwtmiddleware,postController.getAllProjectContoller)

// get user Post
router.get('/user-post',jwtmiddleware,postController.getuserPostContoller)

// delter user  post
router.delete('/remove-post/:id',jwtmiddleware,postController.removeUserProjectCOntroller)
module.exports = router