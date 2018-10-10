var db = require('../../models')
const router = require('express').Router();
const passport = require('passport');
const verify = require('../../jwt/verify');
const auth = require('../../controllers/auth')


  // process the login form
  router.post('/login', auth.login)

  // handle logout
  router.post('/logout', verify.verifyToken, auth.logout)
  
  // signup
  router.post('/signup', auth.register)


  module.exports = router;
