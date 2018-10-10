var db = require('../../models')
const router = require('express').Router();
const verify = require('../../jwt/verify'),
bucketlist = require('../../controllers/bucketlist')


  // process the login form
  router.post('/', verify.verifyToken, bucketlist.create)

  router.get('/', verify.verifyToken, bucketlist.read)

  router.get('/:id', verify.verifyToken, bucketlist.readOne)

  router.put('/:id', verify.verifyToken, bucketlist.update)

  router.delete('/:id', verify.verifyToken, bucketlist.delete)


  router.post('/:id/items', verify.verifyToken, bucketlist.createItem)

  router.get('/:id/items', verify.verifyToken, bucketlist.readItem)

  router.get('/:id/items/:itemId', verify.verifyToken, bucketlist.readOneItem)

  router.put('/:id/items/:itemId', verify.verifyToken, bucketlist.updateItem)

  router.delete('/:id/items/:itemId', verify.verifyToken, bucketlist.deleteItem)
  module.exports = router;
