// load the things we need
var mongoose = require('mongoose')

// define the schema for our user model
var item = mongoose.Schema({
 name: String,
 done: {type: Boolean, default: false}
},
{
    timestamps: { createdAt: 'date_created', updatedAt: 'date_modified' }
})

// create the model for users and expose it to our app
module.exports = mongoose.model('Item', item)

// https://www.cartthrob.com/docs/tags_detail/save_customer_info_form/
