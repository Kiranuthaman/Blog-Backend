const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title:{
        required:true,
        type : String
    },
    content :{
        required : true,
        type : String

    },
    postImg :{
        required : true,
        type : String

    },
    public: { 
        type: Boolean,
         default: true
    },
    likes: { 
        type: Number,
         default: 0
    },
    userId:{
        required:true,
        type : String

    }
})

const posts = mongoose.model('posts',  postSchema)
module.exports = posts