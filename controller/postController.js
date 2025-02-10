const { response, json } = require('express');
const posts = require('../model/postMoel')

exports.addPostController = async (req,res)=>{
    
    console.log("Inside add Proect Controller");
    const {title,content,public, likes} = req.body
    console.log(title,content,public,likes);
    
    const postImg = req.file.filename
    console.log(postImg);
    const userId = req.payload

    try {
       const newPost = new posts({title,content,public,likes,postImg,userId})
        await newPost.save(
            res.status(200).json(newPost)
        )
    } catch (error) {
        res.status(401).json(`Post adding failed due to ${error} `)
    }
    
}

// GET ALL project

exports.getAllProjectContoller = async(req,res)=>{
    const searchKey = req.query.search
    console.log(searchKey);

    const query = {
        title:{
            $regex : searchKey, $options : "i"
        }
    }

    try {
        const getAllPost = await posts.find(query)
        res.status(200).json(getAllPost)
        
    } catch (error) {
        response.status(401).json(error)
    }

    
}

// get user post

exports.getuserPostContoller = async(req,res)=>{
    const userId = req.payload

    try {
        const userPost = await posts.find({userId})
        res.status(200).json(userPost)
    } catch (error) {
        response.status(401).json(error)  
    }
}

// delete user project

exports.removeUserProjectCOntroller = async(req,res)=>{
    const {id} = req.params
    try {
        await posts.findOneAndDelete({_id:id})
        res.status(200).json('project deleted sucessfully')
    } catch (error) {
        res.status(401).json(error)
    }
}