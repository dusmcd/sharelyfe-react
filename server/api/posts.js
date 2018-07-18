const { Post, User, Booking } = require('../db/models')
const router = require('express').Router()

router.get('/', (req, res, next) => {
  Post.findAll()
    .then(posts => res.json(posts))
    .catch(err => next(err))
})

router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id, { include: [User] })
    .then(post => {
      res.json(post)
    })
    .catch(err => next(err))
})

router.get('/:id/bookings', (req, res, next) => {
  Booking.findAll({ where: { postId: req.params.id } })
    .then(bookings => res.json(bookings))
    .catch(err => next(err))
})

router.post('/', (req, res, next) => {
  const newPost = {
    title: req.body.title,
    description: req.body.description,
    price: +req.body.price,
  }
  Post.create(newPost)
    .then(post => res.status(201).json(post))
    .catch(err => next(err))
})

module.exports = router
