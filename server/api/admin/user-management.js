const router = require('express').Router()
const { User } = require('../../db/models')

router.get('/get', (req, res, next) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(err => next(err))
})

router.get('/:id/getBookings', (req, res, next) => {
  // query DB for bookings based on user id
})

router.get('/:id/getPosts', (req, res, next) => {
  // query DB for posts based on user id
})

module.exports = router
