const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');
const salt = bcrypt.genSaltSync(10);
const secret = 'asdfe45we45w345wegw345werjktjwertkj';
<<<<<<< HEAD
const port = process.env.PORT||4000;
=======
const port = process.env.PORT || 4000;

const app = express();

// CORS configuration
app.use(cors({
  origin: 'https://mern-blog-app-frontend-1bee.onrender.com',
  credentials: true,
}));

// Enable preflight for all routes
app.options('*', cors());
>>>>>>> dfe3cb9ae93ca202ab8543a065180882ba242885

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

<<<<<<< HEAD
mongoose.connect('mongodb+srv://arindamsingh209:arindam@cluster1.29d0mug.mongodb.net/?retryWrites=true&w=majority');
//Register Page
app.post('/register', async (req,res) => {
  const {username,password} = req.body;
  try{
=======
// Connect to MongoDB
mongoose.connect('mongodb+srv://arindamsingh209:arindam@cluster1.29d0mug.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Register endpoint
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
>>>>>>> dfe3cb9ae93ca202ab8543a065180882ba242885
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});
<<<<<<< HEAD
//Login Page
app.post('/login', async (req,res) => {
  const {username,password} = req.body;
  const userDoc = await User.findOne({username});
=======

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  if (!userDoc) return res.status(400).json('User not found');

>>>>>>> dfe3cb9ae93ca202ab8543a065180882ba242885
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) return res.status(500).json(err);
      res.cookie('token', token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json('Wrong credentials');
  }
});
<<<<<<< HEAD
//user information header jsx
app.get('/profile', (req,res) => {
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, (err,info) => {
    if (err) throw err;
=======

// Profile endpoint
app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) return res.status(401).json('Unauthorized');
>>>>>>> dfe3cb9ae93ca202ab8543a065180882ba242885
    res.json(info);
  });
});

// Logout endpoint
app.post('/logout', (req, res) => {
  res.cookie('token', '', { maxAge: 0 }).json('ok');
});
<<<<<<< HEAD
//CreatePostPage
app.post('/post', uploadMiddleware.single('file'), async (req,res) => {
  const {originalname,path} = req.file;
=======

// Create post endpoint
app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
  const { originalname, path } = req.file;
>>>>>>> dfe3cb9ae93ca202ab8543a065180882ba242885
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path + '.' + ext;

  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) return res.status(401).json('Unauthorized');

    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(postDoc);
  });
});
<<<<<<< HEAD
//EditPost
app.put('/post',uploadMiddleware.single('file'), async (req,res) => {
=======

// Update post endpoint
app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
>>>>>>> dfe3cb9ae93ca202ab8543a065180882ba242885
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) return res.status(401).json('Unauthorized');

    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) return res.status(403).json('You are not the author');

    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });

    res.json(postDoc);
  });
});
<<<<<<< HEAD
// shown the post at home page
app.get('/post', async (req,res) => {
  res.json(
    await Post.find()
      .populate('author', ['username'])
      .sort({createdAt: -1})
      .limit(20)
  );
});
//postPage
=======

// Get all posts endpoint
app.get('/post', async (req, res) => {
  const posts = await Post.find()
    .populate('author', ['username'])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(posts);
});

// Get single post endpoint
>>>>>>> dfe3cb9ae93ca202ab8543a065180882ba242885
app.get('/post/:id', async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
});

<<<<<<< HEAD
app.listen(port, () => {
  console.log('Server is running on port 4000');
=======
// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
>>>>>>> dfe3cb9ae93ca202ab8543a065180882ba242885
});
