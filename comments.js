// Create web server with express
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create express application
const app = express();
// Parse the body of the incoming request
app.use(bodyParser.json());
// Enable cors
app.use(cors());

// Store comments in memory
const commentsByPostId = {};

// Get all comments for a post
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create a new comment for a post
app.post('/posts/:id/comments', (req, res) => {
  // Generate a random id for the comment
  const commentId = randomBytes(4).toString('hex');
  // Get the content from the request body
  const { content } = req.body;
  // Get the comments for the post
  const comments = commentsByPostId[req.params.id] || [];
  // Add the new comment to the list
  comments.push({ id: commentId, content, status: 'pending' });
  // Update the comments for the post
  commentsByPostId[req.params.id] = comments;
  // Send the new comment back
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});
