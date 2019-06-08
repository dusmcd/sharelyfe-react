const express = require('express')
const router = express.Router()

router.use('/auth', require('./auth'))
router.use('/posts', require('./posts'))
router.use('/me', require('./users'))
router.use('/admin', isAdmin, require('./admin'))
router.use('/categories', require('./categories'))

function isAdmin(req, res, next) {
  if (req.user.isAdmin) {
    return next()
  }
  const error = new Error('Unauthorized')
  error.status = 401
  return next(error)
}

module.exports = router
