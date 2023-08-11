// // Import necessary libraries and modules
// const express = require('express');
// const bodyParser = require('body-parser');

// // Create an instance of Express app
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware to parse incoming JSON data
// app.use(bodyParser.json());

// // Example in-memory data store (replace with a database in production)
// const commentsDB = {};

// // Add a new comment
// app.post('/api/comments', (req, res) => {
//   const { movieId, content } = req.body;
//   if (!commentsDB[movieId]) {
//     commentsDB[movieId] = [];
//   }
//   commentsDB[movieId].push({ content, timestamp: new Date() });
//   res.status(201).json({ message: 'Comment added successfully' });
// });

// // Get comments for a specific movie
// app.get('/api/comments/:movieId', (req, res) => {
//   const { movieId } = req.params;
//   const comments = commentsDB[movieId] || [];
//   res.status(200).json(comments);
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
