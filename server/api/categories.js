const router = require('express').Router()
const { Category, Post } = require('../db/models')

router.get('/', (req, res, next) => {
  return Category.findAll()
    .then(categories => res.json(categories))
    .catch(err => next(err))
})

router.get('/posts', (req, res, next) => {
  return Category.findAll({
    include: [{ model: Post }],
  })
    .then(categories => res.json(categories))
    .catch(err => next(err))
})

module.exports = router
