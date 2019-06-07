const express = require('express')
const router = express.Router()
const { Category } = require('../db/models')

router.use('/auth', require('./auth'))
router.use('/posts', require('./posts'))
router.use('/me', require('./users'))
router.use('/admin', isAdmin, require('./admin'))

router.get('/categories', (req, res, next) => {
  return Category.findAll()
    .then(categories => res.json(categories))
    .catch(err => next(err))
})

function isAdmin(req, res, next) {
  if (req.user.isAdmin) {
    return next()
  }
  const error = new Error('Unauthorized')
  error.status = 401
  return next(error)
}

module.exports = router
