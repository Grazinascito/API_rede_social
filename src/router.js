const express = require('express');
const users = require('./controllers/users');

const router = express();

//user register
router.post('/users', users.userRegister);

module.exports = router;