const express = require('express');
const users = require('./controllers/users');
const userLogin = require ('./controllers/login');
const posts = require('./controllers/posts');
const loginVerify = require('./filter/loginVerify');

const router = express();

//user register
router.post('/users', users.userRegister);
router.post('/login', userLogin.userLogin);



//feed principal 
router.get('/', posts.listPosts);

router.use(loginVerify);

//posts
router.get('/posts', posts.userPost);
router.post('/posts', posts.postRegister);
router.patch('/posts/:id', posts.updatePost);
router.delete('/posts/:id', posts.deletePost);


module.exports = router;