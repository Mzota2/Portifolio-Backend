const express = require('express');
const router = express.Router();
const {signIn, signUp, logout, getUser} = require('../Controllers/userController');
const {verifyAccessToken} = require('../JWT/Authorisation')
//home section
router.route('/signup').post(signUp);
router.route('/signin').post(signIn);
router.route('/logout').get(logout);

module.exports = router;