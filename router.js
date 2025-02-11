// import express
const express = require('express')

//  instance router
const router = new express.Router()

// user controller
const userController = require('./controller/userController')

const postController = require('./controller/postController')

// comment controller
const commentController =require('./controller/CommetsController')

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

// update user post 
router.put('/update-post/:id',jwtmiddleware,multerconfig.single("postImg"),postController.updateUserProjectController)

// likes
router.patch('/posts/:id/like', postController.addLikePostController);

// add commentiy
router.post('/comment/:id', jwtmiddleware,commentController.addCommentController);

// Route for getting all comments for a specific post
router.get('/postcomments/:id', jwtmiddleware,commentController.getCommentsController);

router.put('/statusupdate/:id',jwtmiddleware,postController.addstatusController)


module.exports = router