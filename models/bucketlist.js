// load the things we need
var mongoose = require('mongoose')
var Schema = mongoose.Schema

// define the schema for our user model
var bucketlist = mongoose.Schema({
 name: String,
 items : [
    { type: Schema.Types.ObjectId, ref: 'Item' }
 ],
 created_by :  [{ type: Schema.Types.ObjectId, ref: 'User' }],
},
{
    timestamps: { createdAt: 'date_created', updatedAt: 'date_modified' }
})

// create the model for users and expose it to our app
module.exports = mongoose.model('BucketList', bucketlist)

// https://www.cartthrob.com/docs/tags_detail/save_customer_info_form/
