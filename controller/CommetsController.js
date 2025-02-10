const comments = require('../model/commentModel');
const posts = require('../model/postMoel'); // Fixed typo (postMoel -> postModel)
const users = require('../model/usermodel'); // Fixed typo (usermodel -> userModel)

exports.addCommentController = async (req, res) => {
  console.log("Inside comment section");
console.log(req.body);

  const { content } = req.body;
  const authorId = req.payload; // Assuming req.payload contains the user ID after authentication
  const postId = req.params.id; // Assuming postId is in the URL params
  console.log("kkk",req.payload);
  console.log(authorId);
  console.log(req.params);
  console.log(content);
  console.log(postId);
  
  

  if (!content) {
    return res.status(400).json({ message: 'Content is required' });
  }

  try {
    // Check if postId is valid
    const post = await posts.find({postId});
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    console.log(post);
    
    // Check if authorId is valid
    const user = await users.findById(authorId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create the new comment
    const newComment = new comments({
      content,
      authorId,
      postId,
    });

    // Save the comment to the database
    await newComment.save();

    // Respond with the created comment
    return res.status(201).json({
      message: 'Comment added successfully',
      comment: newComment,
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// to get comments

exports.getCommentsController = async (req, res) => {
  console.log("Inside get comments section");

  const postId = req.params.id;
  console.log("Post ID:", postId);

  try {
    // Check if postId is valid
    const post = await posts.find({ postId }); 
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Fetch all comments for the given postId
    const commentsList = await comments.find({ postId });

    // If no comments found
    if (commentsList.length === 0) {
      return res.status(404).json({ message: 'No comments found for this post' });
    }

    // Respond with the comments
    return res.status(200).json({
      message: 'Comments retrieved successfully',
      comments: commentsList,
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
