const router = require('express').Router()
const { Post, Booking } = require('../db/models')

router.get('/posts', (req, res, next) => {
  Post.findAll({ where: { userId: req.user.id }, include: [Booking] })
    .then(posts => res.json(posts))
    .catch(err => next(err))
})

module.exports = router
