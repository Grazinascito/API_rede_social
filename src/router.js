const express = require('express');
const users = require('./controllers/users');
const userLogin = require ('./controllers/login');

const router = express();

//user register
router.post('/users', users.userRegister);
router.post('/login', userLogin.userLogin);

module.exports = router;