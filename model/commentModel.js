const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true, 
      trim: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users', 
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'posts',
      required: true,
    }
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the Comment model
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
