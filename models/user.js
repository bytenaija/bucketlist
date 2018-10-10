// load the things we need
var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')
var jwt = require('jsonwebtoken')
const CONFIG = require('../config')

// define the schema for our user model
var userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  token: String,
  expiry: String,
})

// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// checking if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.methods.generateJwt = function () {
  var expiry = new Date()
  expiry.setDate(expiry.getDate() + 7)

  return jwt.sign({
    _id: this._id,
    email: this.email,
    exp: parseInt(expiry.getTime() / 1000)
  }, CONFIG.jwt_encryption) // DO NOT KEEP YOUR SECRET IN THE CODE!
}


// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema)

// https://www.cartthrob.com/docs/tags_detail/save_customer_info_form/
