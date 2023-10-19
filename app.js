const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000; 
const fs = require("fs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static(__dirname));

// Dummy data for Fartbook
let fartbookData = JSON.parse(fs.readFileSync("postsandcomments.json"));

// Serve the HTML template
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// API endpoint to get Fartbook data
app.get('/api/fartbook', (req, res) => {
  res.json(fartbookData);
});

// API endpoint to create a new Fartbook post
app.post('/api/fartbook', (req, res) => {
  console.log("New post:  ", req.body);
  const { username, postText } = req.body;
  const newPost = {
    id: fartbookData.length + 1,
    username,
    postText,
    comments: []
  };
  fartbookData.push(newPost);
  res.json({ message: 'Post created successfully', post: newPost });
});

app.get('/api/fartbook/:id/search', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = fartbookData.find((item) => item.id === postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found"});
  }
  
  res.json({ message: "Finished search job (Marko2155)", post: post });
})

// API endpoint to add a comment to a Fartbook post
app.post('/api/fartbook/:id/comment', (req, res) => {
  console.log("New comment: ", req.body);
  const postId = parseInt(req.params.id);
  const { username, commentText } = req.body;
  const post = fartbookData.find((item) => item.id === postId);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  const newComment = { username, text: commentText };
  post.comments.push(newComment);
  res.json({ message: 'Comment added successfully', comment: newComment });
});

app.listen(port, () => {
  console.log(`Fartbook API is listening on port ${port}`);
});
