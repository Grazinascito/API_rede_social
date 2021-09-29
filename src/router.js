const express = require('express');
const users = require('./controllers/users');
const userLogin = require ('./controllers/login');
const posts = require('./controllers/posts');

const router = express();

//user register
router.post('/users', users.userRegister);
router.post('/login', userLogin.userLogin);

//posts
router.post('/posts', posts.postRegister);
router.patch('/posts/:id', posts.updatePost);

module.exports = router;