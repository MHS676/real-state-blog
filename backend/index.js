const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// Routes setup
const authRoutes = require('./src/routes/auth.user');
const blogRoutes = require('./src/routes/blog.route');
const commentRoutes = require('./src/routes/comment.route');

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes);

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Mongodb connected successfully!');
  } catch (err) {
    console.error('Mongodb connection failed:', err);
  }

  app.get('/', (req, res) => {
    res.send('Hotel Rooftop Server is Running..!');
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

main();
