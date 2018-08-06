const router = require('express').Router()
const { Post, Booking, User } = require('../db/models')

router.get('/posts', (req, res, next) => {
  Post.findAll({
    where: { userId: req.user.id },
    include: [{ model: Booking, include: [User] }],
  })
    .then(posts => res.json(posts))
    .catch(err => next(err))
})

router.get('/bookings', (req, res, next) => {
  Booking.findAll({ where: { userId: req.user.id }, include: [Post] })
    .then(bookings => res.json(bookings))
    .catch(err => next(err))
})

module.exports = router
