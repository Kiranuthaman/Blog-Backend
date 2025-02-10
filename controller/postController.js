const { response, json } = require('express');
const posts = require('../model/postMoel')
const mongoose = require('mongoose');

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


// // get all post based on query
// exports.getAllProjectController = async (req, res) => {
//     try {
//         const searchKey = req.query.search || "";
//         const userId = req.user ? req.user.id : null; // Get logged-in user ID

//         let query = {
//             title: { $regex: searchKey, $options: "i" }
//         };

//         if (!userId) {
//             // If user is not logged in, only show public posts
//             query.public = true;
//         } else {
//             // Show public posts + private posts of the owner
//             query.$or = [{ public: true }, { userId }];
//         }

//         const getAllPosts = await posts.find(query);
//         res.status(200).json(getAllPosts);
        
//     } catch (error) {
//         console.error("Error fetching projects:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };


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


// edit  user posts 

exports.updateUserProjectController = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.payload;
        const { title, content,  } = req.body;

        // Fetch the existing post from the database
        const existingPost = await posts.findById(id);
        if (!existingPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Use uploaded file if available, otherwise keep existing image
        const uploadImg = req.file ? req.file.filename : existingPost.postImg;

        // Update the post
        const updatedPost = await posts.findByIdAndUpdate(
            { _id: id },
            { title, content, postImg: uploadImg, userId },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(400).json({ message: "Failed to update post" });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};

// adding likes
exports.addLikePostController = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate MongoDB Object ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid post ID format' });
        }

        // Update the post and increment likes atomically
        const updatedPost = await posts.findByIdAndUpdate(
            id,
            { $inc: { likes: 1 } },
            { new: true, runValidators: true }
        ).exec();

        // Check if post exists
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({ 
            message: `Like added successfully, total likes: ${updatedPost.likes}`, 
            post: updatedPost 
        });
    } catch (error) {
        console.error('Error adding like:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
